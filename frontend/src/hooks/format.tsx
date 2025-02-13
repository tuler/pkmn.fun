import { Dex } from "@pkmn/sim";
import { useReadPkmnv2Format } from "./contracts";

export const useFormat = () => {
    const read = useReadPkmnv2Format();
    const { data } = read;
    const format = data ? Dex.formats.get(data) : undefined;
    return { format, ...read };
};
