// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IBattleCallback {
    function handleBattleResult(
        bytes32 _inputHash,
        uint8 _winner,
        int32 _eloDelta,
        bytes memory _err,
        bytes memory _log
    ) external;
}
