import { pkmnSimpleArenaAbi, pkmnSimpleArenaAddress } from "@/hooks/contracts";
import {
    Alert,
    Button,
    Group,
    Loader,
    Overlay,
    Stack,
    Text,
    Textarea,
    useMantineColorScheme,
} from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { Teams } from "@pkmn/sim";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { IconExclamationCircle } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { stringToHex } from "viem";
import {
    useSimulateContract,
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import { TeamSpecies } from "./team/species";
import { TransactionHash } from "./web3/txhash";

interface SubmitTeamProps {
    teamNumber: 1 | 2;
    team: PokemonSet<string>[];
    onCancel: () => void;
    onSuccess: () => void;
}

export const SubmitTeam: FC<SubmitTeamProps> = ({
    onCancel,
    onSuccess,
    teamNumber,
    team,
}) => {
    const { colorScheme } = useMantineColorScheme();
    const addRecentTransaction = useAddRecentTransaction();
    const packed = Teams.pack(team);

    const {
        data: hash,
        error,
        isPending,
        writeContract: submitTeam,
    } = useWriteContract();

    const { data: simulateData } = useSimulateContract({
        abi: pkmnSimpleArenaAbi,
        address: pkmnSimpleArenaAddress,
        functionName: `submitTeam${teamNumber}`,
        args: [stringToHex(packed)],
    });

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    const handleSubmit = () => {
        if (!simulateData?.request) return;
        submitTeam(simulateData.request);
    };

    useEffect(() => {
        if (hash) {
            addRecentTransaction({
                hash,
                description: `Submit Team ${teamNumber}`,
            });
        }
    }, [hash]);

    useEffect(() => {
        console.log("isConfirmed", isConfirmed);
        if (isConfirmed) {
            onSuccess();
        }
    }, [isConfirmed]);

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
            <Group pos="relative">
                <TeamSpecies team={team} />
                <Overlay
                    color={colorScheme === "light" ? "#fff" : "#000"}
                    backgroundOpacity={0.6}
                >
                    <Group justify="center" h="100%">
                        <Button
                            onClick={onCancel}
                            variant="white"
                            disabled={!submitTeam || isPending || !simulateData}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="gradient"
                            disabled={!submitTeam || isPending || !simulateData}
                        >
                            {isPending ? "Confirming..." : "Submit"}
                        </Button>
                    </Group>
                </Overlay>
            </Group>
            <Group justify="space-between">
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
            </Group>
        </Stack>
    );
};
