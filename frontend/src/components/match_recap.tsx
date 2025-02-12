import { Match } from "@/hooks/match";
import { Stack } from "@mantine/core";
import { FC } from "react";
import { AddressText } from "./address";

export interface MatchRecapProps {
    match: Match;
}

export const MatchRecap: FC<MatchRecapProps> = (props) => {
    const { match } = props;
    return (
        <Stack>
            <AddressText address={match.player1} />
            <AddressText address={match.player2} />
        </Stack>
    );
};
