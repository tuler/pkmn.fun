// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../lib/coprocessor-base-contract/src/CoprocessorAdapter.sol";

contract PKMNV2 is CoprocessorAdapter {
    string public constant FORMAT = "gen9ou";

    address player1;
    address player2;
    bytes team1;
    bytes team2;

    struct Battle {
        address player1;
        address player2;
        bytes team1;
        bytes team2;
        uint8 winner; // 0 (tie), 1 (player1), 2 (player2)
        bytes log;
        uint256 timestamp;
    }

    Battle[] public battles;

    // error if player tries to take a seat already taken
    error SeatTaken();

    // Track active matches per player
    constructor(
        address _taskIssuerAddress,
        bytes32 _machineHash
    ) CoprocessorAdapter(_taskIssuerAddress, _machineHash) {}

    function submitTeam1(bytes calldata teamData) external {
        if (player1 != address(0)) {
            revert SeatTaken();
        }
        player1 = msg.sender;
        team1 = teamData;
        maybeStartBattle();
    }

    function submitTeam2(bytes calldata teamData) external {
        if (player2 != address(0)) {
            revert SeatTaken();
        }
        player2 = msg.sender;
        team2 = teamData;
        maybeStartBattle();
    }

    function maybeStartBattle() internal {
        if (player1 != address(0) && player2 != address(0)) {
            // Call coprocessor to simulate battle
            bytes memory input = abi.encode(FORMAT, team1, team2);
            bytes32 inputHash = keccak256(input);
            computationSent[inputHash] = true;
            taskIssuer.issueTask(machineHash, input, address(this));
        }
    }

    function handleNotice(
        bytes32 /* _payloadHash */,
        bytes memory notice
    ) internal override {
        // notice is ABI encoded with matchId, winner (0, 1, 2), and match description
        (uint8 _winner, bytes memory _log) = abi.decode(notice, (uint8, bytes));

        // Create new battle record and add to battles array
        battles.push(
            Battle({
                player1: player1,
                player2: player2,
                team1: team1,
                team2: team2,
                winner: _winner,
                log: _log,
                timestamp: block.timestamp
            })
        );

        // reset to allow a new battle
        player1 = address(0);
        player2 = address(0);
        team1 = "";
        team2 = "";
    }
}
