"use client";

import { AppShell, Button, Group, Stack, Text, Title } from "@mantine/core";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function App() {
    const account = useAccount();
    const { connectors, connect, status, error } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Text>Pokemon Showdown</Text>
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                <Stack>
                    <div>
                        <Title>Account</Title>

                        <Stack>
                            <Text>status: {account.status}</Text>
                            <Text>
                                addresses: {JSON.stringify(account.addresses)}
                            </Text>
                            <Text>chainId: {account.chainId}</Text>
                        </Stack>

                        {account.status === "connected" && (
                            <Button onClick={() => disconnect()}>
                                Disconnect
                            </Button>
                        )}
                    </div>

                    <div>
                        <Title>Connect</Title>
                        <Group>
                            {connectors.map((connector) => (
                                <Button
                                    key={connector.uid}
                                    onClick={() => connect({ connector })}
                                    type="button"
                                >
                                    {connector.name}
                                </Button>
                            ))}
                        </Group>
                        <Text>{status}</Text>
                        <Text>{error?.message}</Text>
                    </div>
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
