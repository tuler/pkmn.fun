"use client";

import { Image, ImageProps } from "@mantine/core";
import { Icons, Sprites } from "@pkmn/img";
import { FC } from "react";
import parse from "style-to-object";

export type GetPokemonOptions = Parameters<typeof Sprites.getPokemon>[1];
export interface PokemonImageProps extends ImageProps {
    name: string;
    options?: GetPokemonOptions;
}

export const PokemonImage: FC<PokemonImageProps> = (props) => {
    const { name, options, ...imageProps } = props;

    let url, w, h, pixelated;
    if (name) {
        const v = Sprites.getPokemon(name, options);
        url = v.url;
        w = v.w;
        h = v.h;
        pixelated = v.pixelated;
        if (url == "https://play.pokemonshowdown.com/sprites/gen5/0.png") {
            url = "https://placehold.co/100x100/red/white?text=!";
        }
    } else {
        url = "https://placehold.co/100x100?text=?";
        w = 100;
        h = 100;
        pixelated = false;
    }

    return (
        <Image
            w={w}
            h={h}
            src={url}
            style={pixelated ? { imageRendering: "pixelated" } : undefined}
            {...imageProps}
        />
    );
};

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
