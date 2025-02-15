export default [
    {
        type: "constructor",
        inputs: [
            {
                name: "_battleSimulator",
                type: "address",
                internalType: "contract IBattleSimulator",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "FORMAT",
        inputs: [],
        outputs: [{ name: "", type: "string", internalType: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "INITIAL_ELO",
        inputs: [],
        outputs: [{ name: "", type: "int32", internalType: "int32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "battleSimulator",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "contract IBattleSimulator",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "battles",
        inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        outputs: [
            {
                name: "player1",
                type: "address",
                internalType: "address",
            },
            {
                name: "player2",
                type: "address",
                internalType: "address",
            },
            { name: "team1", type: "bytes", internalType: "bytes" },
            { name: "team2", type: "bytes", internalType: "bytes" },
            { name: "winner", type: "uint8", internalType: "uint8" },
            {
                name: "eloDelta",
                type: "int32",
                internalType: "int32",
            },
            { name: "err", type: "bytes", internalType: "bytes" },
            { name: "log", type: "bytes", internalType: "bytes" },
            {
                name: "timestamp",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getBattleCount",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getElo",
        inputs: [
            {
                name: "player",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [{ name: "", type: "int32", internalType: "int32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "handleBattleResult",
        inputs: [
            { name: "", type: "bytes32", internalType: "bytes32" },
            { name: "_winner", type: "uint8", internalType: "uint8" },
            {
                name: "_eloDelta",
                type: "int32",
                internalType: "int32",
            },
            { name: "_err", type: "bytes", internalType: "bytes" },
            { name: "_log", type: "bytes", internalType: "bytes" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "player1",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "player2",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "submitTeam1",
        inputs: [{ name: "teamData", type: "bytes", internalType: "bytes" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "submitTeam2",
        inputs: [{ name: "teamData", type: "bytes", internalType: "bytes" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "team1",
        inputs: [],
        outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "team2",
        inputs: [],
        outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
        stateMutability: "view",
    },
    {
        type: "event",
        name: "BattleCreated",
        inputs: [
            {
                name: "battleId",
                type: "uint256",
                indexed: false,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "ELOChanged",
        inputs: [
            {
                name: "player",
                type: "address",
                indexed: false,
                internalType: "address",
            },
            {
                name: "elo",
                type: "int32",
                indexed: false,
                internalType: "int32",
            },
            {
                name: "eloDelta",
                type: "int32",
                indexed: false,
                internalType: "int32",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "PlayerChanged",
        inputs: [
            {
                name: "playerNumber",
                type: "uint8",
                indexed: false,
                internalType: "uint8",
            },
            {
                name: "player",
                type: "address",
                indexed: false,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "error",
        name: "PlayerAssigned",
        inputs: [
            {
                name: "playerNumber",
                type: "uint8",
                internalType: "uint8",
            },
        ],
    },
] as const;
