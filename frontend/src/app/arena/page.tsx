"use client";

import { Stack } from "@mantine/core";
import { Arena } from "@/components/arena";
import { BattleHistory } from "@/components/history";

function Play() {
    return (
        <Stack gap={100} p={40}>
            <Arena />
            <BattleHistory />
        </Stack>
    );
}

export default Play;
