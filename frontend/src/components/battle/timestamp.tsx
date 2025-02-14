import { Text, TextProps } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import { FC } from "react";

export interface TimestampProps extends TextProps {
    timestamp: BigInt;
}

export const Timestamp: FC<TimestampProps> = ({ timestamp, ...otherProps }) => {
    const ts = Number(timestamp);
    const date = new Date(ts * 1000);
    return (
        <Text {...otherProps}>
            {formatDistanceToNow(date, { addSuffix: true })}
        </Text>
    );
};
