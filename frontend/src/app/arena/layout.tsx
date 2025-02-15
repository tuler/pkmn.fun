import { Header } from "@/components/header";
import { Anchor, Breadcrumbs, Stack, Text } from "@mantine/core";
import { type ReactNode } from "react";

export default async function Layout(props: { children: ReactNode }) {
    return (
        <Stack p={10}>
            <Header>
                <Breadcrumbs>
                    <Anchor href="/">Home</Anchor>
                    <Text>Arena</Text>
                </Breadcrumbs>
            </Header>
            {props.children}
        </Stack>
    );
}
