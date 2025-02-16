import { Arena } from "@/hooks/arena";
import { NextResponse } from "next/server";
import path from "path";
import sharp, { Blend } from "sharp";
import { zeroAddress } from "viem";
import { teamImage } from "../pokemon";
import { getArena } from "../web3";

const isFull = (arena: Arena) => {
    return (
        arena.player1 &&
        arena.player1 !== zeroAddress &&
        arena.player2 &&
        arena.player2 !== zeroAddress &&
        arena.team1 &&
        arena.team2 &&
        arena.team1.length > 0 &&
        arena.team2.length > 0
    );
};

const isEmpty = (arena: Arena) => {
    return (
        (!arena.player1 || arena.player1 === zeroAddress) &&
        (!arena.player2 || arena.player2 === zeroAddress)
    );
};

const getChallenger = (arena: Arena) => {
    if (arena.player1 === zeroAddress) {
        return { player: arena.player2, team: arena.team2 };
    } else {
        return { player: arena.player1, team: arena.team1 };
    }
};

export async function GET(req: Request) {
    const width = 1200;
    const height = 630;
    const margin = 100;

    // get arena from smart contract
    const arena = await getArena();
    if (!arena) {
        return new NextResponse("Arena not found", { status: 404 });
    }

    const silhouette = await sharp("public/img/pikachu_silhouette.png")
        .resize(80, 80)
        .ensureAlpha(0.5)
        .flop()
        .toBuffer();

    // Load background image from public folder
    const backgroundPath = path.join(process.cwd(), "public/img/bg1.png");
    const background = await sharp(backgroundPath)
        .resize(width, height)
        .toBuffer();

    if (isFull(arena)) {
        // battle in progress
    } else if (isEmpty(arena)) {
        // no one in the arena
        // XXX: render pikachu?
    } else {
        // someone is waiting
        const { player, team } = getChallenger(arena);
        if (team && team.length > 0) {
            // render team
            const names = team.map((p) => p.name);
            const { image, w } = await teamImage(names, {
                gap: 20,
                skew: 50,
            });

            const svgText = `
<svg width="${width}" height="${height}">
  <style>
    .text {
      font-family: Arial;
      font-size: 24px;
      fill: black;
    }
  </style>
  <text 
    x="${width - 20}" 
    y="40"
    text-anchor="end"
    class="text"
  >${player}</text>
</svg>`;

            const s = [
                { left: 200, top: 220 },
                { left: 300, top: 270 },
                { left: 400, top: 320 },
                { left: 500, top: 370 },
                { left: 600, top: 420 },
                { left: 700, top: 470 },
            ].map(({ left, top }) => ({
                input: silhouette,
                left,
                top,
                blend: "darken" as Blend,
            }));
            const finalImage = await sharp(background)
                .composite([
                    {
                        input: await image.toFormat("png").toBuffer(),
                        left: width - w - margin * 1.5,
                        top: margin,
                    },
                    {
                        input: Buffer.from(svgText),
                        top: 0,
                        left: 0,
                    },
                    ...s,
                ])
                .toFormat("png")
                .toBuffer();

            return new NextResponse(finalImage, {
                headers: {
                    "Content-Type": "image/png",
                    "Cache-Control": "public, max-age=31536000, immutable",
                },
            });
        }
    }

    const finalImage = await sharp(background).toFormat("png").toBuffer();
    return new NextResponse(finalImage, {
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
