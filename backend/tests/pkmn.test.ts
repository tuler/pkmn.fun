import { Teams } from "@pkmn/sim";
import fs from "fs";
import path from "path";
import { stringToHex } from "viem";
import { describe, expect, it } from "vitest";
import { simulate } from "../src/pkmn";

const loadTeam = (filename: string): string => {
    return fs.readFileSync(path.join(__dirname, "teams", filename), "utf8");
};

const loadSimulation = (filename: string): string => {
    return fs.readFileSync(
        path.join(__dirname, "simulations", filename),
        "utf8"
    );
};

describe("pkmn", () => {
    it("simulate", async () => {
        const p1 = "a99e22f356876c18";
        const p2 = "ba481473315f5818";
        const team1 = Teams.pack(Teams.import(loadTeam(`${p1}.txt`)));
        const team2 = Teams.pack(Teams.import(loadTeam(`${p2}.txt`)));

        const { winner, description } = await simulate(
            "gen9ou",
            stringToHex(team1),
            stringToHex(team2)
        );

        const expectedDescription = loadSimulation(`${p1}_${p2}.txt`);
        expect(winner).toBe(2);
        expect(description).toBe(expectedDescription);
    });
});
