"use client";

import { FC } from "react";
import { PokemonSet } from "@pkmn/sets";
import { Group, GroupProps } from "@mantine/core";
import { PokemonIcon } from "../pokemon/icon";

export interface TeamIconsProps extends GroupProps {
    team?: PokemonSet<string>[] | null;
}

export const TeamIcons: FC<TeamIconsProps> = (props) => {
    const { team, ...otherProps } = props;
    return (
        <Group {...otherProps}>
            {team?.map((pk, index) => (
                <PokemonIcon key={index} name={pk.name || pk.species} />
            ))}
        </Group>
    );
};
