"use client";

import { PokemonSet } from "@pkmn/sets";
import { Flex, FlexProps, StyleProp } from "@mantine/core";
import { FC } from "react";
import { PokemonImage } from "../pokemon/image";
import { PokemonDetails } from "../pokemon/details";

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

export interface TeamDetailsProps extends FlexProps {
    team?: PokemonSet<string>[] | null;
}

export const TeamDetails: FC<TeamDetailsProps> = (props) => {
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
