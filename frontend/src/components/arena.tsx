import { useArena } from "@/hooks/arena";
import { Stack, Title } from "@mantine/core";
import { FC } from "react";
import { ArenaPlayer } from "./player";

export const Arena: FC = () => {
    const { arena } = useArena();
    const { format, player1, player2, team1, team2 } = arena || {};

    return (
        <Stack align="center" gap={50}>
            {format && (
                <>
                    <ArenaPlayer
                        format={format}
                        player={player1}
                        team={team1}
                        playerNumber={1}
                    />
                    <Title order={2}>vs</Title>
                    <ArenaPlayer
                        format={format}
                        player={player2}
                        team={team2}
                        playerNumber={2}
                    />
                </>
            )}
        </Stack>
    );
};
