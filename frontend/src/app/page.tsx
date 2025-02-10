"use client";

import { Formats, isRandomSupported } from "@/components/formats";
import { TeamComponent } from "@/components/team";
import {
    Alert,
    Anchor,
    AppShell,
    Button,
    Center,
    Group,
    Image,
    Stack,
    Text,
} from "@mantine/core";
import { PokemonSet, Teams } from "@pkmn/sets";
import { TeamGenerators } from "@pkmn/randoms";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { Dex, Format } from "@pkmn/sim";

const exp = `Raichu  
Ability: No Ability  
EVs: 252 HP / 252 Atk / 252 Def / 252 SpA / 252 Spe  
Serious Nature  
- Rest  
- Substitute  
- Body Slam  
- Thunder Wave  

Chansey (F)  
Ability: No Ability  
- Reflect  
- Substitute  
- Seismic Toss  
- Submission  

Zapdos  
Ability: No Ability  
- Hyper Beam  
- Reflect  
- Thunder Wave  
- Agility  

Dodrio  
Ability: No Ability  
- Drill Peck  
- Body Slam  
- Rest  
- Substitute  

Moltres  
Ability: No Ability  
EVs: 252 HP / 252 Atk / 252 Def / 252 SpA / 252 Spe  
Serious Nature  
- Double-Edge  
- Fire Spin  
- Reflect  
- Substitute  

Magneton  
Ability: No Ability  
- Reflect  
- Double-Edge  
- Substitute  
- Thunderbolt  
`;

const DEFAULT_FORMAT = Dex.formats.get("gen5randombattle");

function App() {
    const [format, setFormat] = useState<Format>(DEFAULT_FORMAT);
    const team = Teams.importTeam(exp);

    const [error, setError] = useState<string>();
    const [team1, setTeam1] = useState<PokemonSet<string>[] | undefined>();
    const [team2, setTeam2] = useState<PokemonSet<string>[] | undefined>();

    const randomTeam = () => {
        try {
            setError(undefined);
            const teamGenerator = TeamGenerators.getTeamGenerator(format);
            const team = teamGenerator.getTeam();
            setTeam1(team);
        } catch (e: unknown) {
            console.error(e);
            if (typeof e === "string") {
                setError(e);
            } else if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Text>Pokemon Showdown</Text>
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                <Stack gap={50}>
                    {error && (
                        <Alert
                            variant="light"
                            color="red"
                            title="Error"
                            icon={<IconInfoCircle />}
                        >
                            {error}
                        </Alert>
                    )}
                    <Formats
                        value={format.id}
                        onChange={(value) =>
                            value
                                ? setFormat(Dex.formats.get(value))
                                : setFormat(DEFAULT_FORMAT)
                        }
                    />
                    <Group justify="center">
                        <Button
                            onClick={randomTeam}
                            disabled={!isRandomSupported(format)}
                        >
                            Random Team
                        </Button>
                        <Anchor
                            href="https://play.pokemonshowdown.com/teambuilder"
                            target="_blank"
                        >
                            Team Builder
                        </Anchor>
                        <Button onClick={randomTeam}>Import Team</Button>
                    </Group>
                    <TeamComponent team={team1} />
                    <Center>
                        <Image src="/img/versus.png" w={100} h={80} />
                    </Center>
                    <TeamComponent team={team2} />
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
