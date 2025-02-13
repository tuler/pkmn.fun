import { useArena } from "@/hooks/arena";
import {
    Button,
    Center,
    Drawer,
    Group,
    Overlay,
    Stack,
    Title,
    useMantineColorScheme,
} from "@mantine/core";
import { FC } from "react";
import { TeamSpecies, UndefinedTeam } from "./team";
import { AddressText } from "./address";
import { useDisclosure } from "@mantine/hooks";
import { TeamBuilder } from "./builder";

export const Arena: FC = () => {
    const { arena } = useArena();
    const { format, player1, player2, team1, team2 } = arena || {};
    const { colorScheme } = useMantineColorScheme();

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
    const play2 = () => {};

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
            {player1 && team1 && (
                <Stack>
                    <AddressText address={player1} />
                    <TeamSpecies team={team1} />
                </Stack>
            )}

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
                    <TeamBuilder format={format} onSave={(team) => {}} />
                </Drawer>
            )}
        </Stack>
    );
};
