"use client";

import { useMatch } from "@/hooks/match";
import { Stack, Text, Textarea } from "@mantine/core";
import { FC } from "react";

export interface MatchProps {
    id: bigint;
}

export const Match: FC<MatchProps> = (props) => {
    const { id } = props;
    const { match } = useMatch(id);

    return (
        <Stack>
            <Textarea
                rows={20}
                readOnly
                ff="monospace"
                value={JSON.stringify(
                    match,
                    (_key, value) =>
                        typeof value === "bigint" ? value.toString() : value,
                    4,
                )}
            />
        </Stack>
    );
};
