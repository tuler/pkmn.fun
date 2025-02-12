import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, holesky } from "wagmi/chains";

export function getConfig() {
    return getDefaultConfig({
        appName: "pkmn.fun",
        projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
        chains: [anvil, holesky],
        ssr: true,
    });
}

declare module "wagmi" {
    interface Register {
        config: ReturnType<typeof getConfig>;
    }
}
