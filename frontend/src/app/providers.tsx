"use client";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

import { getConfig } from "@/wagmi";
import theme from "@/theme";

export function Providers(props: {
    children: ReactNode;
    initialState?: State;
}) {
    const [config] = useState(() => getConfig());
    const [queryClient] = useState(() => new QueryClient());

    return (
        <MantineProvider theme={theme}>
            <WagmiProvider config={config} initialState={props.initialState}>
                <QueryClientProvider client={queryClient}>
                    {props.children}
                </QueryClientProvider>
            </WagmiProvider>
        </MantineProvider>
    );
}
