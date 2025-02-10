"use client";

import { FC } from "react";
import { PokemonSet, Team } from "@pkmn/sets";
import { Center, Group, SimpleGrid } from "@mantine/core";
import { Pokemon } from "./pokemon";

export interface TeamProps {
    team?: PokemonSet<string>[];
}

export const TeamComponent: FC<TeamProps> = ({ team }) => {
    return (
        <SimpleGrid cols={team?.length}>
            {team?.map((pk, index) => (
                <Group key={index} justify="center">
                    <Pokemon key={index} name={pk.name || pk.species} />
                </Group>
            ))}
        </SimpleGrid>
    );
};
