import { Match } from "@/hooks/match";
import { Stack, Text } from "@mantine/core";
import { FC } from "react";
import { AddressText } from "./address";

export interface MatchSpectateProps {
    match: Match;
}

export const MatchSpectate: FC<MatchSpectateProps> = (props) => {
    const { match } = props;
    return (
        <Stack>
            <AddressText address={match.player1} />
            <AddressText address={match.player2} />
        </Stack>
    );
};
