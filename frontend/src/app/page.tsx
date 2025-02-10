"use client";

import { Formats } from "@/components/formats";
import { TeamComponent } from "@/components/team";
import { AppShell, Button, Group, Stack, Text, Title } from "@mantine/core";
import { Teams } from "@pkmn/sets";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const exp = `Raichu  
Ability: No Ability  
EVs: 252 HP / 252 Atk / 252 Def / 252 SpA / 252 Spe  
Serious Nature  
- Rest  
- Substitute  
- Body Slam  
- Thunder Wave  

Chansey (F)  
Ability: No Ability  
- Reflect  
- Substitute  
- Seismic Toss  
- Submission  

Zapdos  
Ability: No Ability  
- Hyper Beam  
- Reflect  
- Thunder Wave  
- Agility  

Dodrio  
Ability: No Ability  
- Drill Peck  
- Body Slam  
- Rest  
- Substitute  

Moltres  
Ability: No Ability  
EVs: 252 HP / 252 Atk / 252 Def / 252 SpA / 252 Spe  
Serious Nature  
- Double-Edge  
- Fire Spin  
- Reflect  
- Substitute  

Magneton  
Ability: No Ability  
- Reflect  
- Double-Edge  
- Substitute  
- Thunderbolt  
`;

function App() {
    const account = useAccount();
    const { connectors, connect, status, error } = useConnect();
    const { disconnect } = useDisconnect();

    const team = Teams.importTeam(exp);

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
                <TeamComponent team={team} />
                <Formats />
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
