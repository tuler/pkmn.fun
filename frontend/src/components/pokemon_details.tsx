import { Breadcrumbs, Group, List, Paper, Text } from "@mantine/core";
import { PokemonSet } from "@pkmn/sets";
import { StatsTable } from "@pkmn/sim";
import { FC } from "react";
import { PokemonItem } from "./item";

const nonHiddenStats = (stats: StatsTable, hiddenValue: number) =>
    stats
        ? [
              { value: stats.hp, label: "HP", color: "red" },
              { value: stats.atk, label: "Atk", color: "orange" },
              { value: stats.def, label: "Def", color: "yellow" },
              { value: stats.spa, label: "SpA", color: "blue" },
              { value: stats.spd, label: "SpD", color: "green" },
              { value: stats.spe, label: "Spe", color: "pink" },
          ].filter((stat) => stat.value !== hiddenValue)
        : [];

export interface PokemonDetailsProps {
    pokemon: PokemonSet<string>;
}

export const PokemonDetails: FC<PokemonDetailsProps> = (props) => {
    const p = props.pokemon;
    const name = p.name ? `${p.name} (${p.species})` : p.species;
    const item = p.item;
    const title = item ? (
        <Breadcrumbs separator="@">
            <Text fw={800}>{name}</Text>
            <Group gap={5}>
                <Text>{item}</Text>
                <PokemonItem name={p.item} />
            </Group>
        </Breadcrumbs>
    ) : (
        <Text fw={800}>{name}</Text>
    );

    const evs = nonHiddenStats(p.evs, 0);
    const ivs = nonHiddenStats(p.ivs, 31);

    return (
        <Paper withBorder shadow="md" p={20}>
            {title}
            {p.gender !== "" && (
                <Text>Gender: {p.gender !== "" ? p.gender : "-"}</Text>
            )}
            <Text>Ability: {p.ability}</Text>
            {p.happiness !== undefined && <Text>Happiness: {p.happiness}</Text>}
            {evs.length > 0 && (
                <Group>
                    <Text>EVs:</Text>
                    <Breadcrumbs separator="/">
                        {evs.map(({ value, label, color }, index) => (
                            <Text c={color} key={index}>
                                {value} {label}
                            </Text>
                        ))}
                    </Breadcrumbs>
                </Group>
            )}
            {p.nature && <Text>{p.nature} Nature</Text>}
            {p.shiny && <Text>Shiny: {p.shiny ? "Yes" : "No"}</Text>}
            {p.level !== undefined && <Text>Level: {p.level}</Text>}
            {ivs.length > 0 && (
                <Group>
                    <Text>IVs:</Text>
                    <Breadcrumbs separator="/">
                        {ivs.map(({ value, label, color }, index) => (
                            <Text c={color} key={index}>
                                {value} {label}
                            </Text>
                        ))}
                    </Breadcrumbs>
                </Group>
            )}
            <List icon="-">
                {p.moves.map((move) => (
                    <List.Item key={move}>{move}</List.Item>
                ))}
            </List>
        </Paper>
    );
};
