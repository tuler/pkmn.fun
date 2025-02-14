import {
    ActionIcon,
    Anchor,
    CopyButton,
    Group,
    rem,
    Text,
    TextProps,
    Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";
import { Hash } from "viem";
import { useAccount } from "wagmi";

export interface TransactionHashProps extends TextProps {
    hash: Hash;
    shorten?: boolean;
    copyButton?: boolean;
}

export const TransactionHash: FC<TransactionHashProps> = (props) => {
    const { hash, copyButton = true, shorten = true, ...textProps } = props;
    const { chain } = useAccount();

    const text = shorten
        ? hash.slice(0, 6).concat("...").concat(hash.slice(-4))
        : hash;

    const url = chain?.blockExplorers
        ? `${chain.blockExplorers.default.url}/tx/${hash}`
        : undefined;
    const size = textProps.size;

    return (
        <Group gap={2}>
            <Text {...textProps}>{text}</Text>
            {copyButton && (
                <CopyButton value={hash} timeout={2000}>
                    {({ copied, copy }) => (
                        <Tooltip
                            label={copied ? "Copied" : "Copy"}
                            withArrow
                            position="right"
                        >
                            <ActionIcon
                                color={copied ? "teal" : "gray"}
                                variant="subtle"
                                size={size}
                                onClick={copy}
                            >
                                {copied ? (
                                    <IconCheck
                                        style={{
                                            width: rem(size === "xs" ? 12 : 16),
                                        }}
                                    />
                                ) : (
                                    <IconCopy
                                        style={{
                                            width: rem(size === "xs" ? 12 : 16),
                                        }}
                                    />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            )}
            {url && (
                <Anchor href={url} target="_blank">
                    <ActionIcon variant="subtle" color="gray" size={size}>
                        <IconExternalLink
                            style={{
                                width: rem(size === "xs" ? 12 : 16),
                            }}
                        />
                    </ActionIcon>
                </Anchor>
            )}
        </Group>
    );
};
