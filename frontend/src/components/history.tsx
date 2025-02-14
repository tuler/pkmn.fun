import { Stack, Title } from "@mantine/core";
import { FC } from "react";
import { useBattle } from "@/hooks/battle";
import { BattleTagline } from "./battle/tagline";

export const BattleHistory: FC = () => {
    const { battle } = useBattle(0);
    const battles = [battle, battle, battle].filter((b) => !!b);

    return (
        <Stack gap={0} align="center">
            <Title order={4} c="dimmed">
                Past Battles
            </Title>
            {battles.map((b, index) => (
                <BattleTagline key={index} id={0} battle={b} />
            ))}
        </Stack>
    );
};
