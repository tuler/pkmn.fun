import SimpleArena from "@/abi/SimpleArena";
import { defineConfig, loadEnv } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Address, erc20Abi } from "viem";

export default defineConfig(() => {
    const env = loadEnv({ mode: process.env.NODE_ENV });

    return {
        out: "src/hooks/contracts.tsx",
        contracts: [
            {
                abi: erc20Abi,
                name: "erc20",
            },
            {
                abi: SimpleArena,
                name: "SimpleArena",
                address:
                    env.NEXT_PUBLIC_SIMPLE_ARENA_CONTRACT_ADDRESS as Address,
            },
        ],
        plugins: [react()],
    };
});
