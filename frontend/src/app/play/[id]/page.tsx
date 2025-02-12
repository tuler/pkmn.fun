import { Match } from "@/components/match";
import { Stack } from "@mantine/core";

export default async function MatchPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;

    return (
        <Stack gap={50} p={100}>
            <Match id={BigInt(id)} />
        </Stack>
    );
}
