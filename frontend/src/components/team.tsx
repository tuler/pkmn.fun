"use client";

import { FC } from "react";
import { PokemonSet } from "@pkmn/sets";
import {
    Flex,
    FlexProps,
    Image,
    Overlay,
    StyleProp,
    useMantineColorScheme,
} from "@mantine/core";
import { Pokemon } from "./pokemon";
import { useColorScheme } from "@mantine/hooks";

export interface TeamSpeciesProps extends FlexProps {
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

export const TeamSpecies: FC<TeamSpeciesProps> = (props) => {
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
                    <Pokemon key={index} name={pk.name || pk.species} />
                </Flex>
            ))}
        </Flex>
    );
};

export interface UndefinedTeamProps extends FlexProps {
    count?: number;
}

export const UndefinedTeam: FC<UndefinedTeamProps> = (props) => {
    const { count = 6, ...otherProps } = props;
    const direction = props.direction ?? "row";
    const align = direction === "row" ? "flex-end" : "flex-start";

    return (
        <Flex
            align={align}
            justify="center"
            gap={20}
            {...otherProps}
            direction={direction}
            pos="relative"
            wrap="wrap"
        >
            {Array.from({ length: count }, (_, i) => i).map((index) => (
                <Flex
                    direction={oppositeDirection(direction)}
                    align="center"
                    key={index}
                >
                    <Image src={"/img/pikachu_silhouette.png"} w={150} />
                </Flex>
            ))}
        </Flex>
    );
};
