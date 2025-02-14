"use client";

import { Center, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { useBattle } from "@/hooks/battle";
import { PlayerTeam } from "./battle/player_team";
import { BattleLog } from "./battle/log";

export interface BattleViewProps {
    id: number;
}

export const BattleView: FC<BattleViewProps> = ({ id }) => {
    const { battle } = useBattle(id);

    return (
        <Stack p={20}>
            {battle && (
                <>
                    {battle.player1 && battle.team1 && (
                        <PlayerTeam
                            p={10}
                            withBorder
                            player={battle.player1}
                            team={battle.team1}
                            winner={battle.winner === 1}
                        />
                    )}
                    <Center>
                        <Title order={2}>vs</Title>
                    </Center>
                    {battle.player2 && battle.team2 && (
                        <PlayerTeam
                            p={10}
                            withBorder
                            player={battle.player2}
                            team={battle.team2}
                            winner={battle.winner === 2}
                        />
                    )}
                </>
            )}
            <BattleLog log={battle?.log || ""} />
        </Stack>
    );
};
