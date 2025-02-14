import { TeamSpecies } from "@/components/team/species";
import { ActionIcon, Anchor, Button, Group, Stack } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { TeamGenerators } from "@pkmn/randoms";
import { IconBrandX, IconMoodCrazyHappy } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Dex, Format, PRNG, PRNGSeed } from "@pkmn/sim";

const DEFAULT_FORMAT = Dex.formats.get("gen9randombattle");

const randomTeam = (
    format: Format,
    seed?: PRNG | PRNGSeed,
): PokemonSet<string>[] | undefined => {
    const teamGenerator = TeamGenerators.getTeamGenerator(format, seed);
    return teamGenerator.getTeam();
};

export const Teaser: FC = () => {
    const [team, setTeam] = useState<PokemonSet<string>[] | undefined>(
        randomTeam(DEFAULT_FORMAT, PRNG.get(`sodium,0`)),
    );

    return (
        <Stack gap={50} p={100}>
            <Group justify="center">
                <Anchor href="https://x.com/pkmn_fun" target="_blank">
                    <ActionIcon
                        size="lg"
                        color="gray"
                        variant="subtle"
                        radius="lg"
                    >
                        <IconBrandX
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Anchor>
            </Group>
            <Group justify="center">
                <Button
                    leftSection={<IconMoodCrazyHappy />}
                    variant="gradient"
                    onClick={() => setTeam(randomTeam(DEFAULT_FORMAT))}
                    size="lg"
                >
                    I'm feeling lucky!
                </Button>
            </Group>
            <TeamSpecies team={team} />
        </Stack>
    );
};
