// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../lib/coprocessor-base-contract/src/CoprocessorAdapter.sol";
import "./PKMNBattleSimulator.sol";

contract PKMNSimpleArena is PKMNBattleSimulator {
    string public constant FORMAT = "gen9ou";

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
        bytes err;
        bytes log;
        uint256 timestamp;
    }

    Battle[] public battles;

    // error if player tries to take a seat already taken
    error PositionTaken();

    // Track active matches per player
    constructor(
        address _taskIssuerAddress,
        bytes32 _machineHash
    ) PKMNBattleSimulator(_taskIssuerAddress, _machineHash) {}

    // return number of battles
    function getBattleCount() external view returns (uint256) {
        return battles.length;
    }

    // submit a team to the arena
    function submitTeam1(bytes calldata teamData) external {
        if (player1 != address(0)) {
            revert PositionTaken();
        }
        player1 = msg.sender;
        team1 = teamData;
        maybeStartBattle();
    }

    function submitTeam2(bytes calldata teamData) external {
        if (player2 != address(0)) {
            revert PositionTaken();
        }
        player2 = msg.sender;
        team2 = teamData;
        maybeStartBattle();
    }

    function maybeStartBattle() internal {
        if (player1 != address(0) && player2 != address(0)) {
            simulateBattle(FORMAT, team1, team2);
        }
    }

    function handleBattleResult(
        bytes32 /* _payloadHash */,
        uint8 _winner,
        bytes memory _err,
        bytes memory _log
    ) internal override {
        // Create new battle record and add to battles array
        battles.push(
            Battle({
                player1: player1,
                player2: player2,
                team1: team1,
                team2: team2,
                winner: _winner,
                err: _err,
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
