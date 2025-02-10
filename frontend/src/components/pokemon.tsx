"use client";

import { FC } from "react";
import { Sprites } from "@pkmn/img";
import { Image } from "@mantine/core";

export const Pokemon: FC<{ name?: string }> = ({ name }) => {
    let url, w, h, pixelated;
    if (name) {
        // XXX: pass gender as well
        const v = Sprites.getPokemon(name);
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
        />
    );
};
