// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../lib/coprocessor-base-contract/src/CoprocessorAdapter.sol";

contract PKMNV1 is CoprocessorAdapter {
    enum MatchPhase {
        COMMIT, // Players submit team hashes
        REVEAL, // Players reveal their teams
        BATTLE, // Match is simulated
        COMPLETED // Match is finished
    }

    enum MatchOutcome {
        UNDECIDED,
        PLAYER1_WIN,
        PLAYER2_WIN,
        DRAW
    }

    struct Match {
        address player1;
        address player2;
        bytes32 player1TeamHash;
        bytes32 player2TeamHash;
        bytes player1TeamData;
        bytes player2TeamData;
        uint256 revealDeadline;
        MatchPhase phase;
        MatchOutcome outcome;
        address winner;
        bytes description;
    }

    Match[] public matches;
    mapping(bytes32 => uint256) matchIds;

    // Number of blocks players have to reveal their teams
    uint256 public constant REVEAL_DEADLINE_BLOCKS = 100; // 20 minutes in a 12 seconds interval chain
    string public constant FORMAT = "gen9ou";

    event MatchCreated(
        uint256 indexed matchId,
        address indexed player1,
        address indexed player2
    );
    event TeamCommitted(uint256 indexed matchId, address indexed player);
    event TeamRevealed(uint256 indexed matchId, address indexed player);
    event MatchStarted(uint256 indexed matchId);
    event MatchCompleted(uint256 indexed matchId, address winner);

    error InvalidTeamHash();
    error AlreadyInMatch();
    error NoAvailableMatch();
    error InvalidMatchPhase();
    error RevealDeadlinePassed();
    error NotAPlayer();
    error HashMismatch();
    error NoActiveMatch();

    // Track the latest pending match waiting for player2
    uint256 public pendingMatchId;
    bool public hasPendingMatch;

    // Track active matches per player
    mapping(address => uint256) public playerActiveMatch;
    mapping(address => bool) public playerHasActiveMatch;

    constructor(
        address _taskIssuerAddress,
        bytes32 _machineHash
    ) CoprocessorAdapter(_taskIssuerAddress, _machineHash) {}

    function commitTeam(bytes32 teamHash) external {
        if (teamHash == bytes32(0)) {
            revert InvalidTeamHash();
        }

        // Check if player is already in an active match
        if (playerHasActiveMatch[msg.sender]) {
            revert AlreadyInMatch();
        }

        if (!hasPendingMatch) {
            // Create new match
            uint256 newMatchId = matches.length;
            matches.push(
                Match({
                    player1: msg.sender,
                    player2: address(0),
                    player1TeamHash: teamHash,
                    player2TeamHash: bytes32(0),
                    player1TeamData: "",
                    player2TeamData: "",
                    revealDeadline: 0,
                    phase: MatchPhase.COMMIT,
                    outcome: MatchOutcome.UNDECIDED,
                    description: "",
                    winner: address(0)
                })
            );

            pendingMatchId = newMatchId;
            hasPendingMatch = true;
            playerActiveMatch[msg.sender] = newMatchId;
            playerHasActiveMatch[msg.sender] = true;

            emit MatchCreated(newMatchId, msg.sender, address(0));
            emit TeamCommitted(newMatchId, msg.sender);
        } else {
            // Join existing match
            Match storage gameMatch = matches[pendingMatchId];
            gameMatch.player2 = msg.sender;
            gameMatch.player2TeamHash = teamHash;

            playerActiveMatch[msg.sender] = pendingMatchId;
            playerHasActiveMatch[msg.sender] = true;
            hasPendingMatch = false;

            emit TeamCommitted(pendingMatchId, msg.sender);

            // Set reveal deadline N blocks ahead
            gameMatch.revealDeadline = block.number + REVEAL_DEADLINE_BLOCKS;
        }
    }

    function revealTeam(bytes calldata teamData) external {
        // Get player's active match
        if (!playerHasActiveMatch[msg.sender]) {
            revert NoActiveMatch();
        }
        uint256 matchId = playerActiveMatch[msg.sender];
        Match storage gameMatch = matches[matchId];

        // Check if match exists and is in commit phase
        if (gameMatch.phase != MatchPhase.COMMIT) {
            revert InvalidMatchPhase();
        }

        // Check if reveal deadline has passed
        if (block.number > gameMatch.revealDeadline) {
            revert RevealDeadlinePassed();
        }

        // Check if sender is one of the players
        bool isPlayer1 = msg.sender == gameMatch.player1;
        bool isPlayer2 = msg.sender == gameMatch.player2;
        if (!isPlayer1 && !isPlayer2) {
            revert NotAPlayer();
        }

        // Verify hash matches committed hash
        bytes32 teamHash = keccak256(teamData);
        bytes32 committedHash = isPlayer1
            ? gameMatch.player1TeamHash
            : gameMatch.player2TeamHash;
        if (teamHash != committedHash) {
            revert HashMismatch();
        }

        // Store revealed team data
        if (isPlayer1) {
            gameMatch.player1TeamData = teamData;
        } else {
            gameMatch.player2TeamData = teamData;
        }

        emit TeamRevealed(matchId, msg.sender);

        // If both players have revealed, move to battle phase
        if (
            gameMatch.player1TeamData.length > 0 &&
            gameMatch.player2TeamData.length > 0
        ) {
            gameMatch.phase = MatchPhase.BATTLE;
            emit MatchStarted(matchId);

            // Call coprocessor to simulate battle
            bytes memory input = abi.encode(
                FORMAT,
                gameMatch.player1TeamData,
                gameMatch.player2TeamData
            );
            bytes32 inputHash = keccak256(input);
            computationSent[inputHash] = true;
            matchIds[inputHash] = matchId;
            taskIssuer.issueTask(machineHash, input, address(this));
        }
    }

    function handleNotice(
        bytes32 _payloadHash,
        bytes memory notice
    ) internal override {
        // Add logic for handling callback from co-processor containing notices.

        // notice is ABI encoded with matchId, winner (0, 1, 2), and match description
        (uint8 winner, bytes memory description) = abi.decode(
            notice,
            (uint8, bytes)
        );

        uint256 matchId = matchIds[_payloadHash];
        Match storage gameMatch = matches[matchId];

        // Update match state
        gameMatch.description = description;
        gameMatch.phase = MatchPhase.COMPLETED;

        // Set winner based on winner value (1 = player1, 2 = player2, 0 = draw)
        if (winner == 1) {
            gameMatch.winner = gameMatch.player1;
            gameMatch.outcome = MatchOutcome.PLAYER1_WIN;
        } else if (winner == 2) {
            gameMatch.winner = gameMatch.player2;
            gameMatch.outcome = MatchOutcome.PLAYER2_WIN;
        } else {
            // winner == 0 means draw
            gameMatch.winner = address(0);
            gameMatch.outcome = MatchOutcome.DRAW;
        }

        // Emit event with match results
        emit MatchCompleted(matchId, gameMatch.winner);
    }
}
