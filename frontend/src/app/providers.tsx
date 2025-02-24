"use client";

import { MantineProvider } from "@mantine/core";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";

import { getConfig } from "@/wagmi";
import theme from "@/theme";

export function Providers(props: { children: ReactNode }) {
    const [config] = useState(() => getConfig());
    const [queryClient] = useState(() => new QueryClient());
    const walletTheme = lightTheme({
        accentColor: "#ea7149",
        borderRadius: "small",
    });

    return (
        <MantineProvider theme={theme}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider
                        showRecentTransactions={true}
                        theme={walletTheme}
                    >
                        {props.children}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </MantineProvider>
    );
}
