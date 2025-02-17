import { Sprites } from "@pkmn/img";
import { PokemonSet } from "@pkmn/sets";
import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";
import { remote } from "../pokemon";
import { getBattle } from "../web3";

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

export type GetPokemonOptions = Parameters<typeof Sprites.getPokemon>[1];

const topTeam = (team: PokemonSet<string>[], options?: GetPokemonOptions) => {
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

const bottomTeam = (
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
const textImage = (options: TextImageOptions) => {
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

export async function GET(req: Request) {
    const width = 1200;
    const height = 630;

    // Configure Sharp to use the custom fonts
    const fontConfigPath = path.join(process.cwd(), "fonts", "fonts.conf");
    const fontPath = path.join(
        process.cwd(),
        "fonts",
        "RobotoMono-VariableFont_wght.ttf"
    );
    sharp.cache(false);
    if (process.env.NODE_ENV === "production") {
        process.env.FONTCONFIG_PATH = "/var/task/fonts";
        process.env.LD_LIBRARY_PATH = "/var/task";
    }

    // get battle id from request
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get("id") ?? "");
    if (isNaN(id)) {
        return new NextResponse("Invalid id", { status: 400 });
    }

    // get arena from smart contract
    const battle = await getBattle(id);
    if (!battle) {
        return new NextResponse("Battle not found", { status: 404 });
    }

    const trophy = await sharp(
        path.join(process.cwd(), "public/img/trophy_small.png")
    ).toBuffer();

    // Load background image from public folder
    const backgroundPath = path.join(process.cwd(), "public/img/bg1.png");
    const background = await sharp(backgroundPath)
        .resize(width, height)
        .toBuffer();

    // someone is waiting
    if (
        battle.team1 &&
        battle.team1.length > 0 &&
        battle.team2 &&
        battle.team2.length > 0
    ) {
        const player1Text = textImage({
            height,
            left: width - 20,
            text: battle.player1,
            textAnchor: "end",
            top: 40,
            width,
        });
        const player2Text = textImage({
            height,
            left: 20,
            text: battle.player2,
            textAnchor: "start",
            top: height - 20,
            width,
        });

        const top = await Promise.all(topTeam(battle.team1));
        const bottom = await Promise.all(
            bottomTeam(battle.team2, { side: "p1" })
        );

        const composition = [player1Text, player2Text, ...top, ...bottom];
        if (battle.winner === 1) {
            composition.push({
                input: trophy,
                left: width - 100 - 20,
                top: 60,
            });
        } else if (battle.winner === 2) {
            composition.push({ input: trophy, left: 20, top: height - 160 });
        }
        const finalImage = await sharp(background)
            .composite(composition)
            .toFormat("png")
            .toBuffer();

        return new NextResponse(finalImage, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    }

    const finalImage = await sharp(background).toFormat("png").toBuffer();
    return new NextResponse(finalImage, {
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
