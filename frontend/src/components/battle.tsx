import { Battle } from "@/hooks/battle";
import { Button, Group, Image, Stack, Text, Textarea } from "@mantine/core";
import { FC } from "react";
import { TeamSpecies } from "./team";
import { AddressText } from "./address";
import { useDisclosure } from "@mantine/hooks";

interface BattleViewProps {
    battle: Battle;
}

export const BattleView: FC<BattleViewProps> = ({ battle }) => {
    const [teamViewerOpened, { open: openTeamViewer, close: closeTeamViewer }] =
        useDisclosure(false);

    return (
        <Stack>
            <Stack>
                <TeamSpecies team={battle.team1} />
                <Group justify="space-between">
                    <Group gap={2}>
                        <Image src="/img/hat.png" w={32} />
                        <AddressText address={battle.player1} shorten={false} />
                    </Group>
                    <Button variant="subtle" onClick={openTeamViewer}>
                        View Team
                    </Button>
                </Group>
            </Stack>
            <Stack>
                <TeamSpecies team={battle.team2} />
                <Group justify="space-between">
                    <Group gap={2}>
                        <Image src="/img/hat.png" w={32} />
                        <AddressText address={battle.player2} shorten={false} />
                    </Group>
                    <Button variant="subtle" onClick={openTeamViewer}>
                        View Team
                    </Button>
                </Group>
            </Stack>
        </Stack>
    );
};
