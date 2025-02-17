import { TeamSpecies } from "@/components/team/species";
import { ActionIcon, Anchor, Button, Stack, useMatches } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { TeamGenerators } from "@pkmn/randoms";
import { PokemonSet } from "@pkmn/sets";
import { Dex, Format, PRNG, PRNGSeed } from "@pkmn/sim";
import {
    IconBrandX,
    IconMoodCrazyHappy,
    IconSwords,
} from "@tabler/icons-react";
import Link from "next/link";
import { FC, useState } from "react";

const DEFAULT_FORMAT = Dex.formats.get("gen9randombattle");

const randomTeam = (
    format: Format,
    seed?: PRNG | PRNGSeed
): PokemonSet<string>[] | undefined => {
    const teamGenerator = TeamGenerators.getTeamGenerator(format, seed);
    return teamGenerator.getTeam();
};

export const Teaser: FC = () => {
    const [team, setTeam] = useState<PokemonSet<string>[] | undefined>(
        randomTeam(DEFAULT_FORMAT, PRNG.get(`sodium,0`))
    );

    const openArena = true;

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
                {!openArena && (
                    <Button
                        leftSection={<IconMoodCrazyHappy />}
                        variant="gradient"
                        onClick={() => setTeam(randomTeam(DEFAULT_FORMAT))}
                        size="lg"
                    >
                        I'm feeling lucky!
                    </Button>
                )}
                {openArena && (
                    <Button
                        leftSection={<IconSwords />}
                        component={Link}
                        href={"/arena"}
                        variant="gradient"
                        size="lg"
                    >
                        Arena
                    </Button>
                )}
            </Stack>
        </Stack>
    );
};
