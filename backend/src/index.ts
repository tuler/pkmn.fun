import { createApp } from "@deroll/app";
import {
    decodeAbiParameters,
    encodeAbiParameters,
    parseAbiParameters,
    stringToHex,
} from "viem";
import { simulate } from "./pkmn";

const app = createApp({
    url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004",
});

// Handle input encoded in hex
app.addAdvanceHandler(async (data) => {
    console.log("Received advance request data " + JSON.stringify(data));
    const { payload } = data;

    // decode payload data, which has the matchId (for the response), the pkmn format, and teams
    const [formatId, team1, team2] = decodeAbiParameters(
        parseAbiParameters(
            "string format, bytes player1Team, bytes player2Team"
        ),
        payload
    );

    // run simulation
    const { winner, error, log } = await simulate(formatId, team1, team2);

    // debug of battle
    console.log(`winner is P${winner}`);
    console.log(log ?? "");
    console.log(error ?? "");

    // create a notice with the expected match outcome
    await app.createNotice({
        payload: encodeAbiParameters(
            parseAbiParameters("uint8 winner, bytes err, bytes log"),
            [winner, stringToHex(error || ""), stringToHex(log || "")]
        ),
    });

    return "accept";
});

app.start().catch((e) => {
    console.error(e);
    process.exit(1);
});
