"use client";

import { Flex, FlexProps, Image } from "@mantine/core";
import { motion } from "motion/react";
import { FC } from "react";
import { oppositeDirection } from "./species";

export interface UndefinedTeamProps extends FlexProps {
    count?: number;
    isLoading?: boolean;
}

export const UndefinedTeam: FC<UndefinedTeamProps> = (props) => {
    const { count = 6, isLoading, ...otherProps } = props;
    const direction = props.direction ?? "row";
    const align = direction === "row" ? "flex-end" : "flex-start";

    return (
        <motion.div
            animate={
                isLoading
                    ? { opacity: [0.05, 0.1, 0.05] }
                    : { opacity: [0.1, 0.1] }
            }
            initial={{ opacity: 0.1 }}
            transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        >
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
        </motion.div>
    );
};
