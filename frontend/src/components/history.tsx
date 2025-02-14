import { Stack, Title } from "@mantine/core";
import { FC } from "react";
import { useBattle } from "@/hooks/battle";
import { BattleTagline } from "./battle/tagline";
import { useReadPkmnSimpleArenaGetBattleCount } from "@/hooks/contracts";

export const BattleHistory: FC = () => {
    const { data: battleCount } = useReadPkmnSimpleArenaGetBattleCount();
    const { battle } = useBattle(0);
    const battles = [battle].filter((b) => !!b);

    return (
        <Stack gap={0} align="center">
            {battleCount !== undefined && battleCount > 0 && (
                <Title order={4} c="dimmed">
                    Past Battles
                </Title>
            )}
            {battles.map((b, index) => (
                <BattleTagline key={index} id={0} battle={b} />
            ))}
        </Stack>
    );
};
