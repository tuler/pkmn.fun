import { Protocol } from "@pkmn/protocol";
import {
    BattleStreams,
    Dex,
    PRNG,
    RandomPlayerAI,
    Teams,
    TeamValidator,
} from "@pkmn/sim";
import { Hex, hexToString } from "viem";

export type SimulationResult = {
    winner: number; // 0 draw, 1 player1, 2 player2
    error?: string;
    log?: string;
};

export const simulate = async (
    formatId: string,
    player1Team: Hex,
    player2Team: Hex
): Promise<SimulationResult> => {
    const streams = BattleStreams.getPlayerStreams(
        new BattleStreams.BattleStream()
    );

    // unpack teams from string
    const team1 = Teams.unpack(hexToString(player1Team));
    const team2 = Teams.unpack(hexToString(player2Team));

    if (!team1 && !team2) {
        return {
            winner: 0,
            error: "Both teams are invalid",
        };
    } else if (!team2) {
        return {
            winner: 1,
            error: "Player 2 team is invalid",
        };
    } else if (!team1) {
        return {
            winner: 2,
            error: "Player 1 team is invalid",
        };
    }

    // XXX: validate format
    const format = Dex.formats.get(formatId);

    // validate teams
    const validator = TeamValidator.get(format);
    const team1Issues = validator.validateTeam(team1);
    const team2Issues = validator.validateTeam(team2);
    if (team1Issues && team2Issues) {
        // both teams has issues
        // declare a draw
        return {
            winner: 0,
            error: `Invalid teams: ${team1Issues
                .concat(team2Issues)
                .join(" ")}`,
        };
    } else if (team2Issues) {
        // team2 has issues, p1 wins
        return {
            winner: 1,
            error: `Invalid team: ${team2Issues.join(" ")}`,
        };
    } else if (team1Issues) {
        // team1 has issues, p2 wins
        return {
            winner: 2,
            error: `Invalid team: ${team1Issues.join(" ")}`,
        };
    }

    // XXX: reset pokemon gender to M, otherwise simulation assign random genders
    team1.forEach((p) => (p.gender = "M"));
    team2.forEach((p) => (p.gender = "M"));

    const spec = { formatid: formatId };
    const p1spec = { name: "p1", team: Teams.pack(team1) };
    const p2spec = { name: "p2", team: Teams.pack(team2) };

    // initialize random seed
    // XXX: replace this with a seed coming from players
    const seed = PRNG.get("0,0,0,0");

    // instantiate random AI players
    // XXX: replace this with smarter players
    const p1 = new RandomPlayerAI(streams.p1, { seed });
    const p2 = new RandomPlayerAI(streams.p2, { seed });

    return new Promise<SimulationResult>((resolve, _reject) => {
        let log = "";

        // simulate battle
        void p1.start();
        void p2.start();

        void (async () => {
            for await (const chunk of streams.omniscient) {
                // accumulate result to return
                log += chunk;

                for (const { args, kwArgs } of Protocol.parse(chunk)) {
                    // check if winner message
                    if (args[0] === "win") {
                        resolve({
                            winner: parseInt(args[1].charAt(1)),
                            log,
                        });
                    }

                    // check if tie message
                    if (args[0] === "tie") {
                        resolve({ winner: 0, log });
                    }
                }
            }
        })();

        void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);
    });
};
