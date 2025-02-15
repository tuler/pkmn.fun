import { simpleArenaAbi, simpleArenaAddress } from "@/hooks/contracts";
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
import {
    useAddRecentTransaction,
    useConnectModal,
} from "@rainbow-me/rainbowkit";
import { IconExclamationCircle } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { stringToHex } from "viem";
import {
    useAccount,
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
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
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
        abi: simpleArenaAbi,
        address: simpleArenaAddress,
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
                            disabled={isPending}
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
                        {!isConnected && openConnectModal && (
                            <Button
                                variant="gradient"
                                onClick={openConnectModal}
                            >
                                Connect
                            </Button>
                        )}
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
