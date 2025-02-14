import {
    Button,
    Drawer,
    Group,
    Image,
    Paper,
    PaperProps,
    Stack,
} from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { useDisclosure } from "@mantine/hooks";
import { IconTrophyFilled } from "@tabler/icons-react";
import { FC } from "react";
import { Address } from "viem";
import { TeamSpecies } from "../team/species";
import { AddressText } from "../web3/address";
import { TeamDetails } from "../team/details";

export interface PlayerTeamProps extends PaperProps {
    player: Address;
    team: PokemonSet<string>[];
    winner?: boolean;
}

export const PlayerTeam: FC<PlayerTeamProps> = ({
    player,
    team,
    winner,
    ...props
}) => {
    const [teamViewerOpened, { open: openTeamViewer, close: closeTeamViewer }] =
        useDisclosure(false);

    return (
        <Paper bg={winner ? "lightyellow" : undefined} {...props}>
            <Stack gap={10}>
                <TeamSpecies team={team} />
                <Group justify="space-between">
                    <Group gap={2}>
                        {winner && <IconTrophyFilled color="gold" />}
                        <Image src="/img/hat.png" w={32} />
                        <AddressText address={player} shorten={false} />
                    </Group>
                    <Button variant="subtle" onClick={openTeamViewer}>
                        View Team
                    </Button>
                </Group>
                <Drawer
                    opened={teamViewerOpened}
                    onClose={closeTeamViewer}
                    offset={8}
                    position="right"
                >
                    <TeamDetails team={team} />
                </Drawer>
            </Stack>
        </Paper>
    );
};
