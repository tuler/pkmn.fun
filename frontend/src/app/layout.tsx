import "@mantine/core/styles.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { getConfig } from "../wagmi";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pokemon Showdown",
    description: "ETH Pokemon Showdown",
};

export default async function RootLayout(props: { children: ReactNode }) {
    const initialState = cookieToInitialState(
        getConfig(),
        (await headers()).get("cookie"),
    );
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <ColorSchemeScript defaultColorScheme="dark" />
            </head>
            <body className={inter.className}>
                <Providers initialState={initialState}>
                    {props.children}
                </Providers>
            </body>
        </html>
    );
}
