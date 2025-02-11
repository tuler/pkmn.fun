import { Button, Group, Stack } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { Teams } from "@pkmn/sim";
import { FC } from "react";
import { keccak256, toHex } from "viem";
import { TeamComponent } from "./team";

export interface CommitMatchProps {
    team: PokemonSet<string>[];
}

export const CommitMatch: FC<CommitMatchProps> = ({ team }) => {
    const packed = Teams.pack(team);
    const hash = keccak256(toHex(packed));
    const commit = () => {
        console.log(packed);
        console.log(hash);
    };
    return (
        <Stack>
            <TeamComponent team={team} />
            <Group justify="center">
                <Button onClick={commit} variant="gradient">
                    Commit
                </Button>
            </Group>
        </Stack>
    );
};
