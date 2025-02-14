"use client";

import { FC } from "react";
import { PokemonSet } from "@pkmn/sets";
import { Flex, FlexProps, StyleProp } from "@mantine/core";
import { PokemonImage } from "./pokemon";
import { PokemonDetails } from "./pokemon_details";

export interface TeamStatsProps extends FlexProps {
    team?: PokemonSet<string>[] | null;
}

type FlexDirection = StyleProp<React.CSSProperties["flexDirection"]>;
const oppositeDirection = (direction?: FlexDirection) => {
    switch (direction) {
        case "column":
            return "row";
        case "row":
            return "column";
        case "column-reverse":
            return "row-reverse";
        case "row-reverse":
            return "column-reverse";
    }
    return undefined;
};

export const TeamStats: FC<TeamStatsProps> = (props) => {
    const { team, ...otherProps } = props;
    const direction = props.direction ?? "row";
    const align = direction === "row" ? "flex-end" : "flex-start";
    return (
        <Flex
            align={align}
            justify="center"
            gap={20}
            {...otherProps}
            direction={direction}
            wrap="wrap"
        >
            {team?.map((pk, index) => (
                <Flex
                    direction={oppositeDirection(direction)}
                    align="center"
                    key={index}
                >
                    <PokemonImage key={index} name={pk.name || pk.species} />
                    <PokemonDetails pokemon={pk} />
                </Flex>
            ))}
        </Flex>
    );
};
