"use client";

import { FC } from "react";
import { PokemonSet } from "@pkmn/sets";
import { Group, SimpleGrid, SimpleGridProps } from "@mantine/core";
import { Pokemon } from "./pokemon";

export interface TeamProps extends SimpleGridProps {
    team?: PokemonSet<string>[];
}

export const TeamComponent: FC<TeamProps> = (props) => {
    const { team, ...otherProps } = props;
    return (
        <SimpleGrid cols={team?.length} {...otherProps}>
            {team?.map((pk, index) => (
                <Group key={index} justify="center">
                    <Pokemon key={index} name={pk.name || pk.species} />
                </Group>
            ))}
        </SimpleGrid>
    );
};
