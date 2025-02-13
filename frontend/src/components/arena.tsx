import { useArena } from "@/hooks/arena";
import {
    Button,
    Center,
    Drawer,
    Group,
    Overlay,
    Stack,
    Text,
    Title,
    useMantineColorScheme,
} from "@mantine/core";
import { FC, useState } from "react";
import { TeamSpecies, UndefinedTeam } from "./team";
import { AddressText } from "./address";
import { useDisclosure } from "@mantine/hooks";
import { TeamBuilder } from "./builder";
import { PokemonSet } from "@pkmn/sets";
import { SubmitTeam } from "./submit";
import { zeroAddress } from "viem";

export const Arena: FC = () => {
    const [team, setTeam] = useState<PokemonSet<string>[] | undefined>([]);
    const { arena } = useArena();
    const { format, player1, player2, team1, team2 } = arena || {};
    const { colorScheme } = useMantineColorScheme();

    // control for side drawer
    const [
        teamBuilderOpened,
        {
            open: openTeamBuilder,
            close: closeTeamBuilder,
            toggle: toggleTeamBuilder,
        },
    ] = useDisclosure(false);

    const play1 = () => {
        toggleTeamBuilder();
    };
    const play2 = () => {
        toggleTeamBuilder();
    };

    const onSave = (t: PokemonSet<string>[]) => {
        closeTeamBuilder(); // close team builder drawer
        setTeam(t);
    };

    return (
        <Stack align="center" gap={50}>
            {format && (
                <Group gap={8}>
                    <Title order={3}>{format.name}</Title>
                    <Title order={3}>Battle</Title>
                </Group>
            )}

            {!team1 && (
                <Group pos="relative">
                    <UndefinedTeam />
                    <Overlay
                        color={colorScheme === "light" ? "#fff" : "#000"}
                        backgroundOpacity={0.9}
                    >
                        <Center h="100%">
                            <Button variant="gradient" onClick={play1}>
                                Play
                            </Button>
                        </Center>
                    </Overlay>
                </Group>
            )}
            {player1 && player1 !== zeroAddress && team1 && (
                <Stack>
                    <AddressText address={player1} />
                    <TeamSpecies team={team1} />
                </Stack>
            )}

            {(!player1 || player1 === zeroAddress) &&
                !team1 &&
                team &&
                team?.length > 0 && <SubmitTeam teamNumber={1} team={team} />}

            <Title order={2}>vs</Title>

            {!team2 && (
                <Group pos="relative">
                    <UndefinedTeam />
                    <Overlay
                        color={colorScheme === "light" ? "#fff" : "#000"}
                        backgroundOpacity={0.9}
                    >
                        <Center h="100%">
                            <Button variant="gradient" onClick={play2}>
                                Play
                            </Button>
                        </Center>
                    </Overlay>
                </Group>
            )}
            {player2 && team2 && (
                <Stack>
                    <AddressText address={player2} />
                    <TeamSpecies team={team2} />
                </Stack>
            )}
            {format && (
                <Drawer
                    opened={teamBuilderOpened}
                    onClose={closeTeamBuilder}
                    offset={8}
                    position="right"
                >
                    <TeamBuilder format={format} onSave={onSave} />
                </Drawer>
            )}
        </Stack>
    );
};
