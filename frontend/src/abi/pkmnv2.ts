export default [
    {
        type: "constructor",
        inputs: [
            {
                name: "_taskIssuerAddress",
                type: "address",
                internalType: "address",
            },
            {
                name: "_machineHash",
                type: "bytes32",
                internalType: "bytes32",
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
        name: "computationSent",
        inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "coprocessorCallbackOutputsOnly",
        inputs: [
            {
                name: "_machineHash",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "_payloadHash",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "outputs",
                type: "bytes[]",
                internalType: "bytes[]",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "machineHash",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
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
        name: "taskIssuer",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "contract ITaskIssuer",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "error",
        name: "ComputationNotFound",
        inputs: [
            {
                name: "payloadHash",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
    },
    {
        type: "error",
        name: "InsufficientFunds",
        inputs: [
            {
                name: "value",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "balance",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "InvalidOutputLength",
        inputs: [
            {
                name: "length",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "InvalidOutputSelector",
        inputs: [
            {
                name: "selector",
                type: "bytes4",
                internalType: "bytes4",
            },
            {
                name: "expected",
                type: "bytes4",
                internalType: "bytes4",
            },
        ],
    },
    {
        type: "error",
        name: "MachineHashMismatch",
        inputs: [
            {
                name: "current",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "expected",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
    },
    { type: "error", name: "SeatTaken", inputs: [] },
    {
        type: "error",
        name: "UnauthorizedCaller",
        inputs: [
            {
                name: "caller",
                type: "address",
                internalType: "address",
            },
        ],
    },
] as const;
