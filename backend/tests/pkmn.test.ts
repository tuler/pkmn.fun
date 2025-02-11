import { TeamGenerators } from "@pkmn/randoms";
import { Teams } from "@pkmn/sim";
import { describe, expect, it } from "vitest";
import { simulate } from "../src/pkmn";
import { stringToHex } from "viem";

describe("pkmn", () => {
    it("simulate", async () => {
        Teams.setGeneratorFactory(TeamGenerators);
        const formatId = "gen7ubers";
        const team1 = Teams.pack(Teams.generate("gen7randombattle"));
        const team2 = Teams.pack(Teams.generate("gen7randombattle"));

        const { winner, description } = await simulate(
            formatId,
            stringToHex(team1),
            stringToHex(team2)
        );

        expect(winner).toBeGreaterThanOrEqual(0);
        expect(winner).toBeLessThanOrEqual(2);
        expect(description).toBeTruthy();
    });
});
