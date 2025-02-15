// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "coprocessor-base-contract/CoprocessorAdapter.sol";
import "./IBattleCallback.sol";
import "./IBattleSimulator.sol";

contract SimpleArena is IBattleCallback {
    string public constant FORMAT = "gen9ou";
    int32 public constant INITIAL_ELO = 1500;
    IBattleSimulator public battleSimulator;

    address public player1;
    address public player2;
    bytes public team1;
    bytes public team2;

    struct Battle {
        address player1;
        address player2;
        bytes team1;
        bytes team2;
        uint8 winner; // 0 (tie), 1 (player1), 2 (player2)
        int32 eloDelta;
        bytes err;
        bytes log;
        uint256 timestamp;
    }

    // history of battles
    Battle[] public battles;

    // players ELO rating
    mapping(address => int32) private elo;
    mapping(address => bool) private eloInitialized;

    // error if player tries to take a seat already taken
    error PlayerAssigned(uint8 playerNumber);

    // emitted when an arena player changes
    event PlayerChanged(uint8 playerNumber, address player);

    // emitted when a ELO rating changes
    event ELOChanged(address player, int32 elo, int32 eloDelta);

    // Define the BattleCreatedEvent
    event BattleCreated(uint256 battleId);

    // Track active matches per player
    constructor(IBattleSimulator _battleSimulator) {
        battleSimulator = _battleSimulator;
    }

    // return number of battles
    function getBattleCount() external view returns (uint256) {
        return battles.length;
    }

    // submit a team to the arena
    function submitTeam1(bytes calldata teamData) external {
        if (player1 != address(0)) {
            revert PlayerAssigned(1);
        }
        player1 = msg.sender;
        team1 = teamData;

        // initiale player ELO rating (if necessary)
        initializeElo(player1);

        // Emit PlayerChanged event for player1
        emit PlayerChanged(1, player1);

        maybeStartBattle();
    }

    function submitTeam2(bytes calldata teamData) external {
        if (player2 != address(0)) {
            revert PlayerAssigned(2);
        }
        player2 = msg.sender;
        team2 = teamData;

        // initiale player ELO rating (if necessary)
        initializeElo(player2);

        // Emit PlayerChanged event for player2
        emit PlayerChanged(2, player2);

        maybeStartBattle();
    }

    function initializeElo(address player) internal {
        if (!eloInitialized[player]) {
            elo[player] = INITIAL_ELO;
            eloInitialized[player] = true;
        }
    }

    function getElo(address player) external view returns (int32) {
        if (!eloInitialized[player]) {
            return INITIAL_ELO;
        }
        return elo[player];
    }

    function maybeStartBattle() internal {
        if (player1 != address(0) && player2 != address(0)) {
            battleSimulator.simulateBattle(
                FORMAT,
                elo[player1],
                elo[player2],
                team1,
                team2,
                this
            );
        }
    }

    function handleBattleResult(
        bytes32 /* _payloadHash */,
        uint8 _winner,
        int32 _eloDelta,
        bytes memory _err,
        bytes memory _log
    ) external override {
        // Create new battle record and add to battles array
        battles.push(
            Battle({
                player1: player1,
                player2: player2,
                team1: team1,
                team2: team2,
                winner: _winner,
                eloDelta: _eloDelta,
                err: _err,
                log: _log,
                timestamp: block.timestamp
            })
        );

        // update players ELO rating
        elo[player1] += _eloDelta;
        elo[player2] -= _eloDelta;
        if (_eloDelta != 0) {
            emit ELOChanged(player1, elo[player1], _eloDelta);
            emit ELOChanged(player2, elo[player2], _eloDelta);
        }

        // Emit BattleCreatedEvent with the new battle ID
        emit BattleCreated(battles.length - 1);

        // reset to allow a new battle
        player1 = address(0);
        player2 = address(0);
        team1 = "";
        team2 = "";
        emit PlayerChanged(1, player1);
        emit PlayerChanged(2, player2);
    }
}
