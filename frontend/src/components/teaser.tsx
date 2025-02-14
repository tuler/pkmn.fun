import { TeamSpecies } from "@/components/team/species";
import { ActionIcon, Anchor, Button, Stack, useMatches } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { TeamGenerators } from "@pkmn/randoms";
import { IconBrandX, IconMoodCrazyHappy } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Dex, Format, PRNG, PRNGSeed } from "@pkmn/sim";
import { useViewportSize } from "@mantine/hooks";

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

    const { height } = useViewportSize();
    const count = useMatches({
        base: 1,
        md: 6,
    });
    const gap = useMatches({
        base: 0,
        md: 50,
    });

    return (
        <Stack
            gap={50}
            pt={100}
            pb={200}
            align="center"
            justify="space-around"
            h={height}
        >
            <Anchor href="https://x.com/pkmn_fun" target="_blank">
                <ActionIcon size="lg" color="gray" variant="subtle" radius="lg">
                    <IconBrandX
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Anchor>
            <Stack gap={gap} mih={400} justify="flex-end" align="center">
                <TeamSpecies team={team?.slice(0, count)} />
                <Button
                    leftSection={<IconMoodCrazyHappy />}
                    variant="gradient"
                    onClick={() => setTeam(randomTeam(DEFAULT_FORMAT))}
                    size="lg"
                >
                    I'm feeling lucky!
                </Button>
            </Stack>
        </Stack>
    );
};
