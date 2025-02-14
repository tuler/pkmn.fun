import { Group, NavLink, Stack, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { FC } from "react";
import { Battle } from "@/hooks/battle";
import { MiniPlayerTeam } from "./mini";
import { Timestamp } from "./timestamp";

export interface BattleTaglineProps {
    id: number;
    battle: Battle;
}

export const BattleTagline: FC<BattleTaglineProps> = ({ battle, id }) => {
    return (
        <NavLink
            href={`/play/${id}`}
            label={
                <Group justify="space-between" grow>
                    <Stack gap={0} pb="md">
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
                    <Stack gap={0} pb="md">
                        <Text>vs</Text>
                        <MiniPlayerTeam
                            player={battle.player2}
                            team={battle.team2}
                            winner={battle.winner === 2}
                        />
                    </Stack>
                </Group>
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
