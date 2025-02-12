import pkmnv1 from "@/abi/pkmnv1";
import { defineConfig, loadEnv } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Address, erc20Abi } from "viem";

export default defineConfig(() => {
    const env = loadEnv();

    return {
        out: "src/hooks/contracts.tsx",
        contracts: [
            {
                abi: erc20Abi,
                name: "erc20",
            },
            {
                abi: pkmnv1,
                name: "PKMNV1",
                address: env.NEXT_PUBLIC_PKMN_CONTRACT_ADDRESS as Address,
            },
        ],
        plugins: [react()],
    };
});
