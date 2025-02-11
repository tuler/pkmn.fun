import { Button, Group, Stack } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { Dex, Format, TeamValidator } from "@pkmn/sim";
import { FC } from "react";
import { PokemonCombobox } from "./pokemons";

export interface TeamBuilderProps {
    format: Format;
    onSave: (team: PokemonSet<string>[]) => void;
}

export const TeamBuilder: FC<TeamBuilderProps> = ({ format, onSave }) => {
    const validator = TeamValidator.get(format);
    const dex = Dex.forFormat(format);
    const types = dex.types.all();

    const save = () => {
        // onSave(team);
    };

    return (
        <Stack>
            <PokemonCombobox format={format} />
            <Group justify="center">
                <Button onClick={save} variant="gradient">
                    Save
                </Button>
            </Group>
        </Stack>
    );
};
