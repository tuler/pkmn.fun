import { FC, useEffect } from "react";
import { PokemonSet } from "@pkmn/sets";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { Teams } from "@pkmn/sim";
import {
    useWaitForTransactionReceipt,
    useWriteContract,
    useSimulateContract,
} from "wagmi";
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
import { IconExclamationCircle } from "@tabler/icons-react";
import { TransactionHash } from "./web3/txhash";
import { pkmnSimpleArenaAbi, pkmnSimpleArenaAddress } from "@/hooks/contracts";
import { stringToHex } from "viem";
import { TeamSpecies } from "./team/species";

interface SubmitTeamProps {
    teamNumber: 1 | 2;
    team: PokemonSet<string>[];
    onCancel: () => void;
}

export const SubmitTeam: FC<SubmitTeamProps> = ({
    onCancel,
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
