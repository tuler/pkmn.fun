import { Sprites } from "@pkmn/img";
import { PokemonSet } from "@pkmn/sets";
import path from "path";
import sharp from "sharp";

const topPositions = [
    { left: 360, bottom: 150 },
    { left: 490, bottom: 220 },
    { left: 620, bottom: 280 },
    { left: 750, bottom: 350 },
    { left: 880, bottom: 420 },
    { left: 1010, bottom: 480 },
];

const bottomPositions = [
    { right: 190, top: 150 },
    { right: 320, top: 220 },
    { right: 450, top: 280 },
    { right: 580, top: 350 },
    { right: 710, top: 420 },
    { right: 840, top: 480 },
];

export const remote = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return sharp(buffer);
};

export type GetPokemonOptions = Parameters<typeof Sprites.getPokemon>[1];

export const topTeam = (
    team: PokemonSet<string>[],
    options?: GetPokemonOptions
) => {
    const names = team.map((p) => p.name);
    const images = names.map((name) => Sprites.getPokemon(name, options));
    const composites = images.map(async (image, index) => {
        const sh = await remote(image.url);
        const buffer = await sh.toBuffer();
        const position = topPositions[index];
        const left = position.left;
        const top = position.bottom - image.h;
        return { input: buffer, left, top };
    });
    return composites;
};

/**
 * Return a list of pikachu silhouettes for the top team
 * @returns list of composites for top team
 */
export const topTeamUndefined = () => {
    const silhouette = sharp(
        path.join(process.cwd(), "public/img/undefined.png")
    ).toBuffer();
    const composites = topPositions.map(async ({ left, bottom }) => {
        const input = await silhouette;
        const top = bottom - 82; // height of undefined.png
        return { input, left, top };
    });
    return composites;
};

export const bottomTeam = (
    team: PokemonSet<string>[],
    options?: GetPokemonOptions
) => {
    const names = team.map((p) => p.name);
    const images = names.map((name) => Sprites.getPokemon(name, options));
    const composites = images.map(async (image, index) => {
        const sh = await remote(image.url);
        const buffer = await sh.toBuffer();
        const position = bottomPositions[index];
        const left = position.right - image.w;
        const top = position.top;
        return { input: buffer, left, top };
    });
    return composites;
};

/**
 * Return a list of pikachu silhouettes for the bottom team
 * @returns list of composites for bottom team
 */
export const bottomTeamUndefined = () => {
    const silhouette = sharp(
        path.join(process.cwd(), "public/img/undefined.png")
    )
        .flop()
        .toBuffer();
    const composites = bottomPositions.map(async ({ right, top }) => {
        const input = await silhouette;
        const left = right - 90; // width of undefined.png
        return { input, left, top };
    });
    return composites;
};

type TextImageOptions = {
    width: number;
    height: number;
    text: string;
    left: number;
    top: number;
    textAnchor: "start" | "middle" | "end";
    fontSize?: number;
    color?: string;
    fontFamily?: string;
};

export const textImage = (options: TextImageOptions) => {
    const {
        width,
        height,
        text,
        left,
        top,
        textAnchor,
        fontSize,
        color,
        fontFamily,
    } = options;
    const svgText = `
<svg width="${width}" height="${height}">
  <style>
    .text {
      font-family: ${fontFamily ?? "RobotoMono"};
      font-size: ${fontSize ?? 24}px;
      fill: ${color ?? "black"};
    }
  </style>
  <text 
    x="${left}" 
    y="${top}"
    text-anchor="${textAnchor}"
    class="text"
  >${text}</text>
</svg>`;
    return {
        input: Buffer.from(svgText),
        top: 0,
        left: 0,
    };
};
