import { PokemonSet } from "@pkmn/sets";
import { Group, Paper, PaperProps, Stack } from "@mantine/core";
import { FC } from "react";
import { Address } from "viem";
import { TeamIcons } from "../team/icons";
import { IconTrophyFilled } from "@tabler/icons-react";
import { AddressText } from "../web3/address";

export interface MiniPlayerTeamProps extends PaperProps {
    player: Address;
    team: PokemonSet<string>[] | null;
    winner?: boolean;
}

export const MiniPlayerTeam: FC<MiniPlayerTeamProps> = ({
    player,
    team,
    winner,
}) => {
    return (
        <Paper withBorder p={5} bg={winner ? "lightyellow" : undefined}>
            <Stack gap={0}>
                {winner ? (
                    <Group gap={5}>
                        <IconTrophyFilled color="gold" />
                        <AddressText address={player} />
                    </Group>
                ) : (
                    <AddressText address={player} />
                )}

                <TeamIcons team={team} gap={0} justify="space-between" />
            </Stack>
        </Paper>
    );
};
