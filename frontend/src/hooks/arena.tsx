import { PokemonSet } from "@pkmn/sets";
import { Dex, Format, Teams } from "@pkmn/sim";
import { useEffect, useState } from "react";
import { Address, hexToString } from "viem";
import { useReadContracts } from "wagmi";
import {
    pkmnSimpleArenaAbi,
    pkmnSimpleArenaAddress,
    useWatchPkmnSimpleArenaPlayerChangedEvent,
} from "./contracts";

export type Arena = {
    format: Format;
    player1?: Address;
    player2?: Address;
    team1?: PokemonSet<string>[] | null;
    team2?: PokemonSet<string>[] | null;
};

export const useArena = () => {
    const [arena, setArena] = useState<Arena | undefined>();
    const read = useReadContracts({
        contracts: [
            {
                abi: pkmnSimpleArenaAbi,
                address: pkmnSimpleArenaAddress,
                functionName: "FORMAT",
            },
            {
                abi: pkmnSimpleArenaAbi,
                address: pkmnSimpleArenaAddress,
                functionName: "player1",
            },
            {
                abi: pkmnSimpleArenaAbi,
                address: pkmnSimpleArenaAddress,
                functionName: "player2",
            },
            {
                abi: pkmnSimpleArenaAbi,
                address: pkmnSimpleArenaAddress,
                functionName: "team1",
            },
            {
                abi: pkmnSimpleArenaAbi,
                address: pkmnSimpleArenaAddress,
                functionName: "team2",
            },
        ],
    });

    useWatchPkmnSimpleArenaPlayerChangedEvent({
        onLogs: () => read.refetch(),
    });

    useEffect(() => {
        if (read.data) {
            const [f, p1, p2, t1, t2] = read.data;

            if (
                f.status === "success" &&
                p1.status === "success" &&
                p2.status === "success" &&
                t1.status === "success" &&
                t2.status === "success"
            ) {
                const format = Dex.formats.get(f.result);
                const player1 = p1.result;
                const player2 = p2.result;
                const team1 = Teams.unpack(hexToString(t1.result));
                const team2 = Teams.unpack(hexToString(t2.result));
                setArena({
                    format,
                    player1,
                    player2,
                    team1,
                    team2,
                });
            }
        }
    }, [read.data]);

    return { ...read, arena };
};
