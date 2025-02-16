import { Sprites } from "@pkmn/img";
import sharp from "sharp";

const remote = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return sharp(buffer);
};

export type GetPokemonOptions = Parameters<typeof Sprites.getPokemon>[1];
const image = async (name: string, options?: GetPokemonOptions) => {
    const { url, w, h } = Sprites.getPokemon(name, options);
    const image = await remote(url);
    const buffer = await image.toBuffer();
    return { url, w, h, image, buffer };
};

export const teamImage = async (
    names: string[],
    options?: { gap?: number; skew?: number } & GetPokemonOptions
) => {
    const images = await Promise.all(names.map((name) => image(name, options)));

    // gap between each pokemon image
    const gap = options?.gap ?? 0;

    // sheering vertically
    const skew = options?.skew ?? 0;

    // Calculate the height and width of the composited image
    const height =
        Math.max(...images.map((i) => i.h)) + skew * (images.length - 1);
    console.log(height);
    const width =
        images.reduce((acc, i) => acc + i.w, 0) + gap * (images.length - 1);

    // Create a transparent background with dimensions to fit all pokemon
    const background = sharp({
        create: {
            width,
            height,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
    });

    // accumulate the width of the images
    const lefts = images.reduce(
        (acc, i) => [...acc, acc[acc.length - 1] + i.w + gap],
        [0]
    );
    const tops = images.map(
        (i, index) => height - i.h - skew * (images.length - index - 1)
    );

    // Create an array of composite objects for sharp.composite()
    // Each object contains the pokemon image buffer and its position
    // Position is calculated by:
    // - left: accumulated width of previous pokemon
    // - top: total height minus pokemon height to align at bottom
    const composite = images.map(({ buffer, h }, index) => ({
        input: buffer,
        left: lefts[index],
        top: tops[index],
    }));

    return { image: background.composite(composite), w: width, h: height };
};
