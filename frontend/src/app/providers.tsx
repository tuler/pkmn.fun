"use client";

import { MantineProvider } from "@mantine/core";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";

import { getConfig } from "@/wagmi";
import theme from "@/theme";

export function Providers(props: { children: ReactNode }) {
    const [config] = useState(() => getConfig());
    const [queryClient] = useState(() => new QueryClient());

    return (
        <MantineProvider theme={theme}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider showRecentTransactions={true}>
                        {props.children}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </MantineProvider>
    );
}
