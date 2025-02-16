import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";
import { teamImage } from "./pokemon";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Default Title";
    const t = searchParams.get("team");

    const width = 1200;
    const height = 630;
    const margin = 60;

    const overlay = await sharp({
        create: {
            width,
            height,
            channels: 4, // RGBA (Alpha for transparency)
            background: { r: 255, g: 255, b: 255, alpha: 0.5 }, // Black with 50% opacity
        },
    })
        .png()
        .toBuffer();

    const names = t?.split(",") ?? [];
    const {
        image: team1,
        w: team1Width,
        h: team1Height,
    } = await teamImage(names, {
        gap: 20,
        skew: 70,
        side: "p1",
    });
    const {
        image: team2,
        w: team2Width,
        h: team2Height,
    } = await teamImage(
        [
            "Mudsdale",
            "Landorus",
            "Heracross",
            "Zebstrika",
            "Brambleghast",
            "Forretress",
        ],
        { gap: 20, skew: 70, side: "p2" }
    );

    // Load background image from public folder
    const backgroundPath = path.join(process.cwd(), "public/img/bg/bg.png");
    const background = await sharp(backgroundPath)
        .resize(width, height)
        .toBuffer();

    // Combine background and text
    const finalImage = await sharp(background)
        .composite([{ input: overlay, blend: "over" }])
        .composite([
            {
                input: await team1.toFormat("png").toBuffer(),
                left: margin,
                top: height - team1Height - margin,
            },
            {
                input: await team2.toFormat("png").toBuffer(),
                left: width - team2Width - margin,
                top: margin,
            },
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
