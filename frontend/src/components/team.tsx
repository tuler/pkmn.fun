import { FC } from "react";
import { PokemonSet, Team } from "@pkmn/sets";
import { SimpleGrid } from "@mantine/core";
import { Pokemon } from "./pokemon";

export interface TeamProps {
    team?: PokemonSet<string>[];
}

export const TeamComponent: FC<TeamProps> = ({ team }) => {
    return (
        <SimpleGrid cols={team?.length}>
            {team?.map((pk, index) => (
                <Pokemon key={index} name={pk.name || pk.species} />
            ))}
        </SimpleGrid>
    );
};
