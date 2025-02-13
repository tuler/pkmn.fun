import {
    Button,
    Center,
    Drawer,
    Group,
    Image,
    Overlay,
    Stack,
    Text,
    Textarea,
    useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PokemonSet } from "@pkmn/sets";
import { Format } from "@pkmn/sim";
import { FC, useState } from "react";
import { Address, zeroAddress } from "viem";
import { TeamSpecies, UndefinedTeam } from "./team";
import { AddressText } from "./address";
import { SubmitTeam } from "./submit";
import { TeamBuilder } from "./builder";
import { TeamStats } from "./team_stats";

interface ArenaPlayerProps {
    format: Format;
    player?: Address;
    team?: PokemonSet<string>[] | null;
    playerNumber: 1 | 2;
}

export const ArenaPlayer: FC<ArenaPlayerProps> = ({
    format,
    player,
    playerNumber,
    team,
}) => {
    const { colorScheme } = useMantineColorScheme();
    const [newTeam, setNewTeam] = useState<PokemonSet<string>[] | null>(null);

    // control for side drawer
    const [
        teamBuilderOpened,
        { open: openTeamBuilder, close: closeTeamBuilder },
    ] = useDisclosure(false);
    const [teamViewerOpened, { open: openTeamViewer, close: closeTeamViewer }] =
        useDisclosure(false);

    const onSave = (t: PokemonSet<string>[]) => {
        closeTeamBuilder(); // close team builder drawer
        setNewTeam(t);
    };

    const onCancel = () => {
        setNewTeam(null);
    };

    return (
        <Stack>
            {!team && newTeam == null && (
                <Group pos="relative">
                    <UndefinedTeam />
                    <Overlay
                        color={colorScheme === "light" ? "#fff" : "#000"}
                        backgroundOpacity={0.9}
                    >
                        <Center h="100%">
                            <Button
                                variant="gradient"
                                onClick={openTeamBuilder}
                            >
                                Play
                            </Button>
                        </Center>
                    </Overlay>
                </Group>
            )}

            {player && player !== zeroAddress && team && team.length > 0 && (
                <Stack>
                    <TeamSpecies team={team} />
                    <Group justify="space-between">
                        <Group gap={2}>
                            <Image src="/img/hat.png" w={32} />
                            <AddressText address={player} shorten={false} />
                        </Group>
                        <Button variant="subtle" onClick={openTeamViewer}>
                            View Team
                        </Button>
                    </Group>
                </Stack>
            )}

            {(!player || player === zeroAddress) &&
                !team &&
                newTeam &&
                newTeam?.length > 0 && (
                    <SubmitTeam
                        onCancel={onCancel}
                        teamNumber={playerNumber}
                        team={newTeam}
                    />
                )}

            <Drawer
                opened={teamBuilderOpened}
                onClose={closeTeamBuilder}
                offset={8}
                position="right"
            >
                <TeamBuilder format={format} onSave={onSave} />
            </Drawer>
            <Drawer
                opened={teamViewerOpened}
                onClose={closeTeamViewer}
                offset={8}
                position="right"
            >
                <TeamStats team={team} />
            </Drawer>
        </Stack>
    );
};
