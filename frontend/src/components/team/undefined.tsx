"use client";

import { FC } from "react";
import { Flex, FlexProps, Image } from "@mantine/core";
import { oppositeDirection } from "./species";

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
                    <Image src={"/img/pikachu_silhouette.png"} w={100} />
                </Flex>
            ))}
        </Flex>
    );
};
