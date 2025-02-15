import { Group, GroupProps } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, ReactNode } from "react";

export interface HeaderProps extends GroupProps {
    children?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ children, ...otherProps }) => {
    return (
        <Group justify="space-between" mih={50} {...otherProps}>
            <Group gap={5}>{children}</Group>
            <Group gap={5}>
                <ConnectButton />
            </Group>
        </Group>
    );
};
