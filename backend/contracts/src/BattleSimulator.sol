// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "coprocessor-base-contract/CoprocessorAdapter.sol";
import "./IBattleSimulator.sol";

contract BattleSimulator is IBattleSimulator, CoprocessorAdapter {
    constructor(
        address _taskIssuerAddress,
        bytes32 _machineHash
    ) CoprocessorAdapter(_taskIssuerAddress, _machineHash) {}

    mapping(bytes32 => IBattleCallback) public callbacks;

    error CallbackNotFound(bytes32 payloadHash);

    function simulateBattle(
        string memory _format,
        int32 _elo1,
        int32 _elo2,
        bytes memory _team1,
        bytes memory _team2,
        IBattleCallback _callback
    ) external {
        // Call coprocessor to simulate battle
        bytes memory input = abi.encode(_format, _elo1, _elo2, _team1, _team2);
        bytes32 inputHash = keccak256(input);
        computationSent[inputHash] = true;
        callbacks[inputHash] = _callback;
        taskIssuer.issueTask(machineHash, input, address(this));
    }

    function cancelBattle(
        string memory _format,
        int32 _elo1,
        int32 _elo2,
        bytes memory _team1,
        bytes memory _team2
    ) external {
        // Call coprocessor to simulate battle
        bytes memory input = abi.encode(_format, _elo1, _elo2, _team1, _team2);
        bytes32 inputHash = keccak256(input);
        delete computationSent[inputHash];
        delete callbacks[inputHash];
    }

    function handleNotice(
        bytes32 _payloadHash,
        bytes memory notice
    ) internal override {
        // notice is ABI encoded with winner (0, 1, 2), eloDelta, error and battle log
        (
            uint8 _winner,
            int32 _eloDelta,
            bytes memory _err,
            bytes memory _log
        ) = abi.decode(notice, (uint8, int32, bytes, bytes));

        if (address(callbacks[_payloadHash]) == address(0)) {
            revert CallbackNotFound(_payloadHash);
        }
        // call back the requestor
        callbacks[_payloadHash].handleBattleResult(
            _payloadHash,
            _winner,
            _eloDelta,
            _err,
            _log
        );
    }
}
