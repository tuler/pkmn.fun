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
        name: "REVEAL_DEADLINE_BLOCKS",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "commitTeam",
        inputs: [
            {
                name: "teamHash",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
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
        name: "hasPendingMatch",
        inputs: [],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
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
        name: "matches",
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
            {
                name: "player1TeamHash",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "player2TeamHash",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "player1TeamData",
                type: "bytes",
                internalType: "bytes",
            },
            {
                name: "player2TeamData",
                type: "bytes",
                internalType: "bytes",
            },
            {
                name: "revealDeadline",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "phase",
                type: "uint8",
                internalType: "enum PKMNV1.MatchPhase",
            },
            {
                name: "outcome",
                type: "uint8",
                internalType: "enum PKMNV1.MatchOutcome",
            },
            {
                name: "winner",
                type: "address",
                internalType: "address",
            },
            {
                name: "description",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "pendingMatchId",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "playerActiveMatch",
        inputs: [{ name: "", type: "address", internalType: "address" }],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "playerHasActiveMatch",
        inputs: [{ name: "", type: "address", internalType: "address" }],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "revealTeam",
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
        type: "event",
        name: "MatchCompleted",
        inputs: [
            {
                name: "matchId",
                type: "uint256",
                indexed: true,
                internalType: "uint256",
            },
            {
                name: "winner",
                type: "address",
                indexed: false,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "MatchCreated",
        inputs: [
            {
                name: "matchId",
                type: "uint256",
                indexed: true,
                internalType: "uint256",
            },
            {
                name: "player1",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "player2",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "MatchStarted",
        inputs: [
            {
                name: "matchId",
                type: "uint256",
                indexed: true,
                internalType: "uint256",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "TeamCommitted",
        inputs: [
            {
                name: "matchId",
                type: "uint256",
                indexed: true,
                internalType: "uint256",
            },
            {
                name: "player",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "TeamRevealed",
        inputs: [
            {
                name: "matchId",
                type: "uint256",
                indexed: true,
                internalType: "uint256",
            },
            {
                name: "player",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    { type: "error", name: "AlreadyInMatch", inputs: [] },
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
    { type: "error", name: "HashMismatch", inputs: [] },
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
    { type: "error", name: "InvalidMatchPhase", inputs: [] },
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
    { type: "error", name: "InvalidTeamHash", inputs: [] },
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
    { type: "error", name: "NoActiveMatch", inputs: [] },
    { type: "error", name: "NoAvailableMatch", inputs: [] },
    { type: "error", name: "NotAPlayer", inputs: [] },
    { type: "error", name: "RevealDeadlinePassed", inputs: [] },
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
