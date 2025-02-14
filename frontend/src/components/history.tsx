import { useBattle } from "@/hooks/battle";
import { Stack } from "@mantine/core";
import { FC } from "react";
import { BattleView } from "./battle";

export const BattleHistory: FC = () => {
    const { battle } = useBattle(0);

    return <Stack>{battle && <BattleView battle={battle} />}</Stack>;
};
