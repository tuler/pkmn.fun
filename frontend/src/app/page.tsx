"use client";

import { isRandomSupported } from "@/components/formats";
import { TeamComponent } from "@/components/team";
import { Button, Group, Stack } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { TeamGenerators } from "@pkmn/randoms";
import { useState } from "react";
import { Dex, Format } from "@pkmn/sim";

const DEFAULT_FORMAT = Dex.formats.get("gen7randombattle");

const randomTeam = (format: Format): PokemonSet<string>[] | undefined => {
    const teamGenerator = TeamGenerators.getTeamGenerator(format);
    return teamGenerator.getTeam();
};

function App() {
    const [format, setFormat] = useState<Format>(DEFAULT_FORMAT);
    const [team, setTeam] = useState<PokemonSet<string>[] | undefined>(
        randomTeam(DEFAULT_FORMAT),
    );

    return (
        <Stack gap={50} p={100} pt={200}>
            <TeamComponent team={team} />
            <Group justify="center">
                <Button
                    variant="gradient"
                    onClick={() => setTeam(randomTeam(format))}
                    disabled={!isRandomSupported(format)}
                    size="lg"
                >
                    I'm feeling lucky!
                </Button>
            </Group>
        </Stack>
    );
}

export default App;
