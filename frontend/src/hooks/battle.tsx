import { PokemonSet } from "@pkmn/sets";
import { Teams } from "@pkmn/sim";
import { useEffect, useState } from "react";
import { Address, hexToString } from "viem";
import {
    useReadPkmnSimpleArenaBattles,
    useReadPkmnSimpleArenaGetBattleCount,
    useWatchPkmnSimpleArenaBattleCreatedEvent,
} from "./contracts";

export type Battle = {
    player1: Address;
    player2: Address;
    team1: PokemonSet<string>[] | null;
    team2: PokemonSet<string>[] | null;
    winner: 0 | 1 | 2;
    error: string;
    log: string;
    timestamp: BigInt;
};

export const useBattleCount = () => {
    const [count, setCount] = useState<number | undefined>(undefined);
    const read = useReadPkmnSimpleArenaGetBattleCount();
    useEffect(() => {
        if (read.data) {
            setCount(Number(read.data));
        }
    }, [read.data]);

    useWatchPkmnSimpleArenaBattleCreatedEvent({
        onLogs: () => read.refetch(),
    });

    return { ...read, count };
};

export const useBattle = (index: number) => {
    const [battle, setBattle] = useState<Battle>();
    const read = useReadPkmnSimpleArenaBattles({
        args: [BigInt(index)],
    });

    useEffect(() => {
        if (read.data) {
            const [player1, player2, t1, t2, w, e, l, timestamp] = read.data;
            setBattle({
                player1,
                player2,
                team1: Teams.unpack(hexToString(t1)),
                team2: Teams.unpack(hexToString(t2)),
                winner: w as 0 | 1 | 2,
                error: hexToString(e),
                log: hexToString(l),
                timestamp,
            });
        }
    }, [read.status]);

    return { ...read, battle };
};
