import { Address, hexToString } from "viem";
import { useReadPkmnv2Battles } from "./contracts";
import { PokemonSet } from "@pkmn/sets";
import { useEffect, useState } from "react";
import { Teams } from "@pkmn/sim";

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

export const useBattle = (index: number) => {
    const [battle, setBattle] = useState<Battle>();
    const read = useReadPkmnv2Battles({
        args: [BigInt(index)],
    });

    useEffect(() => {
        if (read.data) {
            const [player1, player2, t1, t2, w, l, timestamp] = read.data;
            setBattle({
                player1,
                player2,
                team1: Teams.unpack(hexToString(t1)),
                team2: Teams.unpack(hexToString(t2)),
                winner: w as 0 | 1 | 2,
                error: "", // XXX: add to solidity
                log: hexToString(l),
                timestamp,
            });
        }
    }, [read.status]);

    return { ...read, battle };
};
