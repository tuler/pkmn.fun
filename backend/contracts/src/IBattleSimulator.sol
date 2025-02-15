// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "coprocessor-base-contract/CoprocessorAdapter.sol";
import "./IBattleCallback.sol";

interface IBattleSimulator {
    function simulateBattle(
        string memory _format,
        int32 _elo1,
        int32 _elo2,
        bytes memory _team1,
        bytes memory _team2,
        IBattleCallback _receiver
    ) external;
}
