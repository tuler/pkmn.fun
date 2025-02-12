import { Group, Image } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";

export const Header: FC = () => {
    return (
        <Group justify="space-between">
            <Group gap={5}></Group>
            <Group gap={5}>
                <ConnectButton />
            </Group>
        </Group>
    );
};
