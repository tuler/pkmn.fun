import { Protocol } from "@pkmn/protocol";
import {
    BattleStreams,
    Dex,
    RandomPlayerAI,
    Teams,
    TeamValidator,
} from "@pkmn/sim";
import { Hex, hexToString } from "viem";

export type SimulationResult = {
    winner: number; // 0 draw, 1 player1, 2 player2
    description: string;
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
            description: "Both teams are invalid",
        };
    } else if (!team2) {
        return {
            winner: 1,
            description: "Player 2 team is invalid",
        };
    } else if (!team1) {
        return {
            winner: 2,
            description: "Player 1 team is invalid",
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
            description: `Invalid teams: ${team1Issues
                .concat(team2Issues)
                .join(" ")}`,
        };
    } else if (team2Issues) {
        // team2 has issues, p1 wins
        return {
            winner: 1,
            description: `Invalid team: ${team2Issues.join(" ")}`,
        };
    } else if (team1Issues) {
        // team1 has issues, p2 wins
        return {
            winner: 2,
            description: `Invalid team: ${team1Issues.join(" ")}`,
        };
    }

    const spec = { formatid: formatId };
    const p1spec = { name: "p1", team: team1 };
    const p2spec = { name: "p2", team: team2 };

    // instantiate random AI players
    // XXX: replace this with smarter players
    const p1 = new RandomPlayerAI(streams.p1);
    const p2 = new RandomPlayerAI(streams.p2);

    // simulate battle
    void p1.start();
    void p2.start();

    let log = "";
    let resolveFn = (
        value: SimulationResult | PromiseLike<SimulationResult>
    ) => {};
    let rejectFn = (reason?: any) => {};

    const result = new Promise<SimulationResult>((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
    });

    void (async () => {
        for await (const chunk of streams.omniscient) {
            console.log(chunk);

            // accumulate result to return
            log += chunk;

            for (const { args, kwArgs } of Protocol.parse(chunk)) {
                // check if winner message
                if (args[0] === "win") {
                    resolveFn({
                        winner: parseInt(args[1].charAt(1)),
                        description: log,
                    });
                }

                // check if tie message
                if (args[0] === "tie") {
                    resolveFn({ winner: 0, description: log });
                }
            }
        }
    })();

    void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);

    return result;
};
