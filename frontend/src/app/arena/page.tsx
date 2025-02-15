"use client";

import { Arena } from "@/components/arena";
import { BattleHistory } from "@/components/history";
import { Divider, Stack } from "@mantine/core";

function Play() {
    return (
        <Stack gap={40}>
            <Divider />
            <Arena />
            <Divider />
            <BattleHistory />
        </Stack>
    );
}

export default Play;
