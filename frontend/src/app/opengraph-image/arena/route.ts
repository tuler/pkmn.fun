import { Arena } from "@/hooks/arena";
import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";
import { zeroAddress } from "viem";
import {
    bottomTeam,
    bottomTeamUndefined,
    textImage,
    topTeam,
    topTeamUndefined,
} from "../util";
import { getArena } from "../web3";

const isFull = (arena: Arena): boolean =>
    arena.player1 !== undefined &&
    arena.player1 !== zeroAddress &&
    arena.player2 !== undefined &&
    arena.player2 !== zeroAddress &&
    arena.team1 !== undefined &&
    arena.team2 !== undefined &&
    arena.team1 !== null &&
    arena.team2 !== null &&
    arena.team1.length > 0 &&
    arena.team2.length > 0;

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

    // get arena from smart contract
    const arena = await getArena();
    if (!arena) {
        return new NextResponse("Arena not found", { status: 404 });
    }

    // Load background image from public folder
    const backgroundPath = path.join(process.cwd(), "public/img/bg1.png");
    const background = await sharp(backgroundPath).toBuffer();

    if (isFull(arena)) {
        // battle in progress
        const top = await Promise.all(topTeam(arena.team1 ?? []));
        const bottom = await Promise.all(bottomTeam(arena.team2 ?? []));
        const player1Text = textImage({
            height,
            left: width - 20,
            text: arena.player1 ?? "",
            textAnchor: "end",
            top: 40,
            width,
        });
        const player2Text = textImage({
            height,
            left: 20,
            text: arena.player2 ?? "",
            textAnchor: "start",
            top: 40,
            width,
        });

        const finalImage = await sharp(background)
            .composite([player1Text, player2Text, ...top, ...bottom])
            .toFormat("png")
            .toBuffer();

        return new NextResponse(finalImage, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=60", // only cache for 1 minute, because arena can change
            },
        });
    } else if (isEmpty(arena)) {
        // no one in the arena
        const top = await Promise.all(topTeamUndefined());
        const bottom = await Promise.all(bottomTeamUndefined());
        const finalImage = await sharp(background)
            .composite([...top, ...bottom])
            .toFormat("png")
            .toBuffer();

        return new NextResponse(finalImage, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=60", // only cache for 1 minute, because arena can change
            },
        });
    } else {
        // someone is waiting
        const { player, team } = getChallenger(arena);
        if (player && player !== zeroAddress && team && team.length > 0) {
            const top = await Promise.all(topTeam(team));
            const bottom = await Promise.all(bottomTeamUndefined());
            const player1Text = textImage({
                height,
                left: width - 20,
                text: player,
                textAnchor: "end",
                top: 40,
                width,
            });

            const finalImage = await sharp(background)
                .composite([player1Text, ...top, ...bottom])
                .toFormat("png")
                .toBuffer();

            return new NextResponse(finalImage, {
                headers: {
                    "Content-Type": "image/png",
                    "Cache-Control": "public, max-age=60", // only cache for 1 minute, because arena can change
                },
            });
        }
    }

    const finalImage = await sharp(background).toFormat("png").toBuffer();
    return new NextResponse(finalImage, {
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=60", // only cache for 1 minute, because arena can change
        },
    });
}
