import {
    Button,
    Group,
    Image,
    Paper,
    PaperProps,
    Skeleton,
    Stack,
} from "@mantine/core";
import { FC } from "react";
import { UndefinedTeam } from "../team/undefined";

export interface LoadingTeamProps extends PaperProps {}

export const LoadingTeam: FC<LoadingTeamProps> = ({ ...props }) => {
    return (
        <Paper {...props}>
            <Stack gap={10}>
                <UndefinedTeam isLoading={true} />
                <Group justify="space-between">
                    <Group gap={2}>
                        <Image src="/img/hat.png" w={32} />
                        <Skeleton w={100} h={20} />
                    </Group>
                    <Button variant="subtle" disabled>
                        View Team
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
};
