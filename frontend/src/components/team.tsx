"use client";

import { FC } from "react";
import { PokemonSet } from "@pkmn/sets";
import { Group, SimpleGrid, SimpleGridProps, Stack, Text } from "@mantine/core";
import { Pokemon } from "./pokemon";
import { PokemonStats } from "./pokemon_stats";

export interface TeamProps extends SimpleGridProps {
    team?: PokemonSet<string>[] | null;
    speciesOnly?: boolean;
}

export const TeamComponent: FC<TeamProps> = (props) => {
    const { team, speciesOnly, ...otherProps } = props;
    return (
        <SimpleGrid cols={team?.length} {...otherProps}>
            {team?.map((pk, index) => (
                <Group key={index} justify="center">
                    <Stack justify="flex-end" align="center" h="100%">
                        <Pokemon key={index} name={pk.name || pk.species} />
                        {!speciesOnly && <PokemonStats pokemon={pk} />}
                    </Stack>
                </Group>
            ))}
        </SimpleGrid>
    );
};
