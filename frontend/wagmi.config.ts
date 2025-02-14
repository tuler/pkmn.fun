import PKMNSimpleArena from "@/abi/PKMNSimpleArena";
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
                abi: PKMNSimpleArena,
                name: "PKMNSimpleArena",
                address:
                    env.NEXT_PUBLIC_PKMNSIMPLEARENA_CONTRACT_ADDRESS as Address,
            },
        ],
        plugins: [react()],
    };
});
