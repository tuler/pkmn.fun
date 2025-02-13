import pkmnv1 from "@/abi/pkmnv1";
import pkmnv2 from "@/abi/pkmnv2";
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
                address: env.NEXT_PUBLIC_PKMNV1_CONTRACT_ADDRESS as Address,
            },
            {
                abi: pkmnv2,
                name: "PKMNV2",
                address: env.NEXT_PUBLIC_PKMNV2_CONTRACT_ADDRESS as Address,
            },
        ],
        plugins: [react()],
    };
});
