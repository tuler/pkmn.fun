import { PokemonSet } from "@pkmn/sets";
import { Dex, Format, Teams } from "@pkmn/sim";
import { useEffect, useState } from "react";
import { Address, hexToString } from "viem";
import { useReadContracts } from "wagmi";
import {
    simpleArenaAbi,
    simpleArenaAddress,
    useWatchSimpleArenaPlayerChangedEvent,
} from "./contracts";

export type Arena = {
    format: Format;
    player1?: Address;
    player2?: Address;
    team1?: PokemonSet<string>[] | null;
    team2?: PokemonSet<string>[] | null;
    elo1?: number;
    elo2?: number;
};

export const useArena = () => {
    const [arena, setArena] = useState<Arena | undefined>();
    const read = useReadContracts({
        contracts: [
            {
                abi: simpleArenaAbi,
                address: simpleArenaAddress,
                functionName: "FORMAT",
            },
            {
                abi: simpleArenaAbi,
                address: simpleArenaAddress,
                functionName: "player1",
            },
            {
                abi: simpleArenaAbi,
                address: simpleArenaAddress,
                functionName: "player2",
            },
            {
                abi: simpleArenaAbi,
                address: simpleArenaAddress,
                functionName: "team1",
            },
            {
                abi: simpleArenaAbi,
                address: simpleArenaAddress,
                functionName: "team2",
            },
            {
                abi: simpleArenaAbi,
                address: simpleArenaAddress,
                functionName: "getPlayer1Elo",
            },
            {
                abi: simpleArenaAbi,
                address: simpleArenaAddress,
                functionName: "getPlayer2Elo",
            },
        ],
    });

    useWatchSimpleArenaPlayerChangedEvent({
        onLogs: () => read.refetch(),
    });

    useEffect(() => {
        if (read.data) {
            const [f, p1, p2, t1, t2, e1, e2] = read.data;

            if (
                f.status === "success" &&
                p1.status === "success" &&
                p2.status === "success" &&
                t1.status === "success" &&
                t2.status === "success" &&
                e1.status === "success" &&
                e2.status === "success"
            ) {
                const format = Dex.formats.get(f.result);
                const player1 = p1.result;
                const player2 = p2.result;
                const team1 = Teams.unpack(hexToString(t1.result));
                const team2 = Teams.unpack(hexToString(t2.result));
                const elo1 = e1.result;
                const elo2 = e2.result;
                setArena({
                    format,
                    player1,
                    player2,
                    team1,
                    team2,
                    elo1,
                    elo2,
                });
            }
        }
    }, [read.data]);

    return { ...read, arena };
};
