import { FC } from "react";
import { Dex, Format } from "@pkmn/sim";
import { Select, SelectProps } from "@mantine/core";

const supportedMods = [
    "gen1",
    "gen2",
    "gen3",
    "gen4",
    "gen5",
    "gen6",
    "gen7",
    "gen8",
    "gen9",
];

export const isRandomSupported = (format: Format): boolean => {
    return (
        format.exists &&
        format.team === "random" &&
        !!format.mod &&
        supportedMods.includes(format.mod)
    );
};

export interface FormatsProps extends SelectProps {}

export const Formats: FC<SelectProps> = (props) => {
    const formats = Dex.formats.all();
    return (
        <Select
            label="Format"
            placeholder="Select a battle format"
            data={formats.map((format) => format.id)}
            {...props}
        />
    );
};
