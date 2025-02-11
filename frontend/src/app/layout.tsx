import "@mantine/core/styles.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { type ReactNode } from "react";
import { cookieToInitialState } from "wagmi";

import { getConfig } from "../wagmi";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "pkmn.fun",
    description: "pkmn showdown",
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
                <ColorSchemeScript />
            </head>
            <body>
                <Providers initialState={initialState}>
                    {props.children}
                </Providers>
            </body>
        </html>
    );
}
