import { Address } from "viem";
import { useReadSimpleArenaGetElo } from "./contracts";

export const usePlayerElo = (player: Address) => {
    const read = useReadSimpleArenaGetElo({
        args: [player],
    });
    return { ...read, elo: read.data };
};
