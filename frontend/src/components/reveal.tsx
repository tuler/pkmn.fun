import { Stack } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { FC } from "react";
import { Address, Hex } from "viem";

export interface ReavelMatchProps {
    team: PokemonSet<string>[];
    p1: Address;
    p2: Address;
    t1Hash: Hex;
    t2Hash: Hex;
}

export const RevealMatch: FC = (props) => {
    return <Stack></Stack>;
};
