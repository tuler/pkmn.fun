import { Header } from "@/components/header";
import { Anchor, Breadcrumbs, Stack } from "@mantine/core";
import { type ReactNode } from "react";

export default async function Layout(props: { children: ReactNode }) {
    return (
        <Stack p={10}>
            <Header>
                <Breadcrumbs>
                    <Anchor href="/">Home</Anchor>
                    <Anchor href="/arena">Arena</Anchor>
                </Breadcrumbs>
            </Header>
            {props.children}
        </Stack>
    );
}
