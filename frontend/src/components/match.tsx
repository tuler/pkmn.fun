"use client";

import { Match, MatchPhase, useMatch } from "@/hooks/match";
import { Group, Loader, Stack, Textarea } from "@mantine/core";
import { FC, useEffect } from "react";
import { notFound } from "next/navigation";
import { useAccount } from "wagmi";
import { MatchSpectate } from "./match_spectate";
import { MatchRecap } from "./match_recap";

export interface MatchComponentProps {
    id: bigint;
}

export const MatchComponent: FC<MatchComponentProps> = (props) => {
    const { id } = props;
    const { match, isLoading } = useMatch(id);
    const { address } = useAccount();

    useEffect(() => {
        if (!isLoading && !match) {
            notFound();
        }
    }, [isLoading, match]);

    const myMatch = (match: Match): boolean => {
        return match.player1 === address || match.player2 === address;
    };

    return (
        <Stack>
            <Group justify="center">{isLoading && <Loader size="xl" />}</Group>
            {match && address && !myMatch(match) && (
                <MatchSpectate match={match} />
            )}
            {match && address && match.phase == MatchPhase.COMPLETED && (
                <MatchRecap match={match} />
            )}
            {match && (
                <Textarea
                    rows={20}
                    readOnly
                    ff="monospace"
                    value={JSON.stringify(
                        match,
                        (_key, value) =>
                            typeof value === "bigint"
                                ? value.toString()
                                : value,
                        4,
                    )}
                />
            )}
        </Stack>
    );
};
