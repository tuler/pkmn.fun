"use client";

import { Arena } from "@/components/arena";
import { CommitMatch } from "@/components/commit";
import { Stack } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { useState } from "react";

function Play() {
    // team to play
    const [team, setTeam] = useState<PokemonSet<string>[] | undefined>();

    return (
        <Stack gap={50} p={100}>
            {team && <CommitMatch team={team} />}
            <Arena />
        </Stack>
    );
}

export default Play;
