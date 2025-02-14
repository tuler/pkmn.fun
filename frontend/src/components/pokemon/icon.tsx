"use client";

import { Icons } from "@pkmn/img";
import { FC } from "react";
import parse from "style-to-object";

export interface PokemonIconProps {
    name: string;
}

export const PokemonIcon: FC<PokemonIconProps> = (props) => {
    const { name } = props;
    const { style } = Icons.getPokemon(name);
    const obj = parse(style);
    if (obj && obj["image-rendering"]) {
        obj.imageRendering = obj["image-rendering"];
        delete obj["image-rendering"];
    }
    return obj ? <span style={obj} /> : <></>;
};
