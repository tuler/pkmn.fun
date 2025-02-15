import { useBattle, useBattleCount } from "@/hooks/battle";
import { Pagination, Stack, Title } from "@mantine/core";
import { FC, useState } from "react";
import { BattleTagline } from "./battle/tagline";

/**
 * Chunk an array into smaller arrays of a given size.
 * @param array The array to chunk.
 * @param size The size of the chunks.
 * @returns An array of chunks.
 */
function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}

const BattleHistoryItem: FC<{ id: number }> = ({ id }) => {
    const { battle } = useBattle(id);
    return battle ? <BattleTagline key={id} id={id} battle={battle} /> : <></>;
};

export const BattleHistory: FC = () => {
    const { count } = useBattleCount();
    const pages = chunk(
        Array.from({ length: Number(count ?? 0) }, (_, i) => i),
        10,
    );
    const [activePage, setPage] = useState(1);
    const battleIds = pages[activePage - 1];
    return (
        <Stack gap={0} align="center">
            {battleIds?.length > 0 && (
                <Title order={4} c="dimmed">
                    Past Battles
                </Title>
            )}
            {battleIds?.map((id) => <BattleHistoryItem key={id} id={0} />)}
            {pages.length > 1 && (
                <Pagination
                    total={pages.length}
                    value={activePage}
                    onChange={setPage}
                    mt="sm"
                />
            )}
        </Stack>
    );
};
