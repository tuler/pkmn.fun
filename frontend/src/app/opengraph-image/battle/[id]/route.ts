import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";
import { bottomTeam, textImage, topTeam } from "../../util";
import { getBattle } from "../../web3";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const width = 1200;
    const height = 630;

    // get battle id from url
    const id = parseInt((await params).id);

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
    const background = await sharp(backgroundPath).toBuffer();

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
