"use client";

import { useBattle } from "@/hooks/battle";
import { Center, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { LoadingTeam } from "./loading_team";
import { BattleLog } from "./log";
import { PlayerTeam } from "./player_team";

export interface BattleViewProps {
    id: number;
}

export const BattleView: FC<BattleViewProps> = ({ id }) => {
    const { battle, isFetching: isLoading } = useBattle(id);

    return (
        <Stack p={20}>
            {battle?.player1 && battle?.team1 && (
                <PlayerTeam
                    p={10}
                    withBorder
                    player={battle.player1}
                    team={battle.team1}
                    winner={battle.winner === 1}
                />
            )}
            {isLoading && <LoadingTeam withBorder p={10} />}
            <Center>
                <Title order={2} c="dimmed">
                    vs
                </Title>
            </Center>
            {isLoading && <LoadingTeam withBorder p={10} />}
            {battle?.player2 && battle?.team2 && (
                <PlayerTeam
                    p={10}
                    withBorder
                    player={battle.player2}
                    team={battle.team2}
                    winner={battle.winner === 2}
                />
            )}
            <BattleLog log={battle?.log || ""} />
        </Stack>
    );
};
