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
    error PlayerAssigned(uint8 playerNumber);

    // Define the PlayerChanged event
    event PlayerChanged(address player, uint8 playerNumber);

    // Define the BattleCreatedEvent
    event BattleCreated(uint256 battleId);

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
            revert PlayerAssigned(1);
        }
        player1 = msg.sender;
        team1 = teamData;

        // Emit PlayerChanged event for player1
        emit PlayerChanged(player1, 1);

        maybeStartBattle();
    }

    function submitTeam2(bytes calldata teamData) external {
        if (player2 != address(0)) {
            revert PlayerAssigned(2);
        }
        player2 = msg.sender;
        team2 = teamData;

        // Emit PlayerChanged event for player2
        emit PlayerChanged(player2, 2);

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

        // Emit BattleCreatedEvent with the new battle ID
        emit BattleCreated(battles.length - 1);

        // reset to allow a new battle
        player1 = address(0);
        player2 = address(0);
        team1 = "";
        team2 = "";
        emit PlayerChanged(player1, 1);
        emit PlayerChanged(player2, 2);
    }
}
