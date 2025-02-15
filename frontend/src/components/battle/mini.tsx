import { Group, Paper, PaperProps, Stack, Text } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { IconTrophyFilled } from "@tabler/icons-react";
import { FC } from "react";
import { Address } from "viem";
import { TeamIcons } from "../team/icons";
import { AddressText } from "../web3/address";

export interface MiniPlayerTeamProps extends PaperProps {
    player: Address;
    team: PokemonSet<string>[] | null;
    eloDelta: number;
    winner?: boolean;
}

export const MiniPlayerTeam: FC<MiniPlayerTeamProps> = ({
    player,
    team,
    eloDelta,
    winner,
}) => {
    const eloDeltaColor =
        eloDelta > 0 ? "green" : eloDelta < 0 ? "red" : "dimmed";
    const eloDeltaText = `(${eloDelta > 0 ? "+" : ""}${eloDelta})`;

    return (
        <Paper withBorder p={5} bg={winner ? "lightyellow" : undefined}>
            <Stack gap={0}>
                <Group gap={5}>
                    {winner && <IconTrophyFilled color="gold" />}
                    <AddressText address={player} />
                    <Text c={eloDeltaColor}>{eloDeltaText}</Text>
                </Group>
                <TeamIcons team={team} gap={0} justify="space-between" />
            </Stack>
        </Paper>
    );
};
