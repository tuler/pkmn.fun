import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { anvil, holesky } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export function getConfig() {
    return createConfig({
        chains: [anvil, holesky],
        connectors: [injected()],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        transports: {
            [anvil.id]: http(),
            [holesky.id]: http(),
        },
    });
}

declare module "wagmi" {
    interface Register {
        config: ReturnType<typeof getConfig>;
    }
}
