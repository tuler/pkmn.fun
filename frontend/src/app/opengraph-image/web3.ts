import { Arena } from "@/hooks/arena";
import { simpleArenaAbi, simpleArenaAddress } from "@/hooks/contracts";
import { Dex, Teams } from "@pkmn/sim";
import { createConfig, http, readContracts } from "@wagmi/core";
import { anvil, holesky } from "@wagmi/core/chains";
import { hexToString } from "viem";

export const config = createConfig({
    chains:
        process.env.NODE_ENV === "development" ? [anvil, holesky] : [holesky],
    transports: {
        [anvil.id]: http(),
        [holesky.id]: http(process.env.RPC_URL),
    },
});

export const getArena = async (): Promise<Arena | undefined> => {
    const simpleArenaContract = {
        abi: simpleArenaAbi,
        address: simpleArenaAddress,
    };

    const [f, p1, p2, t1, t2, e1, e2] = await readContracts(config, {
        contracts: [
            {
                ...simpleArenaContract,
                functionName: "FORMAT",
            },
            {
                ...simpleArenaContract,
                functionName: "player1",
            },
            {
                ...simpleArenaContract,
                functionName: "player2",
            },
            {
                ...simpleArenaContract,
                functionName: "team1",
            },
            {
                ...simpleArenaContract,
                functionName: "team2",
            },
            {
                ...simpleArenaContract,
                functionName: "getPlayer1Elo",
            },
            {
                ...simpleArenaContract,
                functionName: "getPlayer2Elo",
            },
        ],
    });
    if (
        f.status === "success" &&
        p1.status === "success" &&
        p2.status === "success" &&
        t1.status === "success" &&
        t2.status === "success" &&
        e1.status === "success" &&
        e2.status === "success"
    ) {
        return {
            format: Dex.formats.get(f.result),
            player1: p1.result,
            player2: p2.result,
            team1: Teams.unpack(hexToString(t1.result)),
            team2: Teams.unpack(hexToString(t2.result)),
            elo1: e1.result,
            elo2: e2.result,
        };
    }
    return undefined;
};
