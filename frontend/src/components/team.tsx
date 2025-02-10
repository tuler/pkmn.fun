import { FC } from "react";
import { Team } from "@pkmn/sets";
import { SimpleGrid } from "@mantine/core";
import { Pokemon } from "./pokemon";

export interface TeamProps {
    team?: Team;
}

export const TeamComponent: FC<TeamProps> = ({ team }) => {
    return (
        <SimpleGrid cols={team?.team.length}>
            {team?.team.map((pk, index) => (
                <Pokemon key={index} name={pk.name || pk.species} />
            ))}
        </SimpleGrid>
    );
};
