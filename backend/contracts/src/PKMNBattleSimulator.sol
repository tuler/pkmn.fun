// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../lib/coprocessor-base-contract/src/CoprocessorAdapter.sol";

abstract contract PKMNBattleSimulator is CoprocessorAdapter {
    constructor(
        address _taskIssuerAddress,
        bytes32 _machineHash
    ) CoprocessorAdapter(_taskIssuerAddress, _machineHash) {}

    function simulateBattle(
        string memory _format,
        bytes memory _team1,
        bytes memory _team2
    ) internal {
        // Call coprocessor to simulate battle
        bytes memory input = abi.encode(_format, _team1, _team2);
        bytes32 inputHash = keccak256(input);
        computationSent[inputHash] = true;
        taskIssuer.issueTask(machineHash, input, address(this));
    }

    function handleNotice(
        bytes32 _payloadHash,
        bytes memory notice
    ) internal override {
        // notice is ABI encoded with winner (0, 1, 2), error and battle log
        (uint8 _winner, bytes memory _err, bytes memory _log) = abi.decode(
            notice,
            (uint8, bytes, bytes)
        );

        handleBattleResult(_payloadHash, _winner, _err, _log);
    }

    function handleBattleResult(
        bytes32 _payloadHash,
        uint8 _winner,
        bytes memory _err,
        bytes memory _log
    ) internal virtual;
}
