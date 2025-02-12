"use client";

import { TeamBuilder } from "@/components/builder";
import { CommitMatch } from "@/components/commit";
import { useFormat } from "@/hooks/format";
import { Stack } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { useState } from "react";

function Play() {
    // team to play
    const [team, setTeam] = useState<PokemonSet<string>[] | undefined>();

    // format (comes from onchain)
    const { format } = useFormat();

    return (
        <Stack gap={50} p={100}>
            {format && !team && (
                <TeamBuilder format={format} onSave={setTeam} />
            )}
            {team && <CommitMatch team={team} />}
        </Stack>
    );
}

export default Play;
