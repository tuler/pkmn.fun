import { PokemonSet } from "@pkmn/sets";
import { Dex, Format, Teams } from "@pkmn/sim";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useReadContracts } from "wagmi";
import { pkmnv2Abi, pkmnv2Address } from "./contracts";

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
                abi: pkmnv2Abi,
                address: pkmnv2Address,
                functionName: "FORMAT",
            },
            {
                abi: pkmnv2Abi,
                address: pkmnv2Address,
                functionName: "player1",
            },
            {
                abi: pkmnv2Abi,
                address: pkmnv2Address,
                functionName: "player2",
            },
            {
                abi: pkmnv2Abi,
                address: pkmnv2Address,
                functionName: "team1",
            },
            {
                abi: pkmnv2Abi,
                address: pkmnv2Address,
                functionName: "team2",
            },
        ],
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
                const team1 = Teams.unpack(t1.result);
                const team2 = Teams.unpack(t2.result);
                setArena({
                    format,
                    player1,
                    player2,
                    team1,
                    team2,
                });
            }
        }
    }, [read.status]);

    return { ...read, arena };
};
