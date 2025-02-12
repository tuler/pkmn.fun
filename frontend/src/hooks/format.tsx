import { Dex } from "@pkmn/sim";
import { useReadPkmnv1Format } from "./contracts";

export const useFormat = () => {
    const read = useReadPkmnv1Format();
    const { data } = read;
    const format = data ? Dex.formats.get(data) : undefined;
    return { format, ...read };
};
