"use client";

import { Icons } from "@pkmn/img";
import { FC } from "react";
import parse from "style-to-object";

export interface PokemonItemProps {
    name: string;
}

export const PokemonItem: FC<PokemonItemProps> = (props) => {
    const { name } = props;
    const { style } = Icons.getItem(name);
    const obj = parse(style);
    return obj ? <span style={obj} /> : <></>;
};
