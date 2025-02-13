import {
    Alert,
    Button,
    Group,
    Loader,
    Stack,
    Text,
    Textarea,
} from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { Teams } from "@pkmn/sim";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { IconExclamationCircle } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { keccak256, toHex } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { TeamStats } from "./team_stats";
import { TransactionHash } from "./txhash";
import { useWritePkmnv1CommitTeam } from "@/hooks/contracts";

export interface CommitMatchProps {
    team: PokemonSet<string>[];
}

export const CommitMatch: FC<CommitMatchProps> = ({ team }) => {
    const { isConnected } = useAccount();
    const addRecentTransaction = useAddRecentTransaction();
    const packed = Teams.pack(team);
    const teamHash = keccak256(toHex(packed));

    const {
        data: hash,
        error,
        isPending,
        writeContract: commitTeam,
    } = useWritePkmnv1CommitTeam();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    useEffect(() => {
        if (hash) {
            addRecentTransaction({
                hash,
                description: "Committing team...",
            });
        }
    }, [hash]);

    return (
        <Stack>
            {error && (
                <Alert
                    icon={<IconExclamationCircle />}
                    variant="light"
                    color="red"
                    title={error.name}
                >
                    <Textarea
                        readOnly
                        rows={5}
                        value={error.message}
                        variant="unstyled"
                    />
                </Alert>
            )}
            <TeamStats team={team} />
            <Group justify="center">
                {isConnected && (
                    <Button
                        onClick={() => commitTeam({ args: [teamHash] })}
                        variant="gradient"
                        disabled={!commitTeam || isPending}
                    >
                        {isPending ? "Confirming..." : "Commit"}
                    </Button>
                )}
            </Group>
            <Stack gap={0}>
                {hash && (
                    <Group gap={2}>
                        <Text>tx: </Text>
                        <TransactionHash hash={hash} />
                    </Group>
                )}
                {isConfirming && (
                    <Group gap={5}>
                        <Loader size="xs" />
                        <Text>Waiting for confirmation...</Text>
                    </Group>
                )}
                {isConfirmed && <Text c="teal">Transaction confirmed.</Text>}
            </Stack>
        </Stack>
    );
};
