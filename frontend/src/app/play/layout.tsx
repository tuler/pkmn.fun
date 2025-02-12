import { Stack } from "@mantine/core";
import { type ReactNode } from "react";
import { Header } from "@/components/header";

export default async function Layout(props: { children: ReactNode }) {
    return (
        <Stack p={10}>
            <Header />
            {props.children}
        </Stack>
    );
}
