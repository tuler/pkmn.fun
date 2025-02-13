import {
    Button,
    Center,
    Drawer,
    Group,
    Overlay,
    Stack,
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
                    <AddressText address={player} />
                    <TeamSpecies team={team} />
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
        </Stack>
    );
};
