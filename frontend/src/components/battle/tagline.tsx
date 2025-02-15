import { Battle } from "@/hooks/battle";
import { Flex, NavLink, Stack, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { FC } from "react";
import { MiniPlayerTeam } from "./mini";
import { Timestamp } from "./timestamp";

export interface BattleTaglineProps {
    id: number;
    battle: Battle;
}

export const BattleTagline: FC<BattleTaglineProps> = ({ battle, id }) => {
    return (
        <NavLink
            href={`/b/${id}`}
            label={
                <Flex
                    align={{ base: "center", sm: "flex-end" }}
                    gap={{ base: 0, sm: "xs" }}
                    justify={{ sm: "space-evenly" }}
                    direction={{ base: "column", sm: "row" }}
                >
                    <Stack gap={0}>
                        <Timestamp
                            timestamp={battle.timestamp}
                            size="xs"
                            c="dimmed"
                        />
                        <MiniPlayerTeam
                            player={battle.player1}
                            team={battle.team1}
                            winner={battle.winner === 1}
                        />
                    </Stack>
                    <Text mb={{ base: 0, sm: 20 }}>vs</Text>
                    <MiniPlayerTeam
                        player={battle.player2}
                        team={battle.team2}
                        winner={battle.winner === 2}
                    />
                </Flex>
            }
            rightSection={
                <IconChevronRight
                    size={12}
                    stroke={1.5}
                    className="mantine-rotate-rtl"
                />
            }
        ></NavLink>
    );
};
