import { FC } from "react";
import { Dex } from "@pkmn/sim";
import { Select, Stack, Text } from "@mantine/core";

export const Formats: FC = () => {
    const formats = Dex.formats.all();
    return (
        <Stack>
            <Select
                label="Format"
                placeholder="Select a battle format"
                data={formats.map((format) => format.name)}
            />
            <Text></Text>
        </Stack>
    );
};
