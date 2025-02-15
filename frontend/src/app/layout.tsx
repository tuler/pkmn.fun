import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { type ReactNode } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "pkmn.fun",
    description: "Web3 AI Battle Simulation",
};

export default async function RootLayout(props: { children: ReactNode }) {
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
                <Providers>{props.children}</Providers>
            </body>
        </html>
    );
}
