import {
    Breadcrumbs,
    DefaultMantineColor,
    Group,
    List,
    Paper,
    StyleProp,
    Text,
} from "@mantine/core";
import { Icons } from "@pkmn/img";
import { PokemonSet } from "@pkmn/sets";
import { StatsTable } from "@pkmn/sim";
import { FC } from "react";
import { PokemonItem } from "./item";

export interface PokemonStatsProps {
    pokemon: PokemonSet<string>;
}

const statsComponent = (stats: StatsTable, hiddenValue: number = 0) => {
    const items = [
        { value: stats.hp, label: "HP", color: "red" },
        { value: stats.atk, label: "Atk", color: "orange" },
        { value: stats.def, label: "Def", color: "yellow" },
        { value: stats.spa, label: "SpA", color: "blue" },
        { value: stats.spd, label: "SpD", color: "green" },
        { value: stats.spe, label: "Spe", color: "pink" },
    ]
        .filter((stat) => stat.value !== hiddenValue)
        .map(({ value, label, color }, index) => (
            <Text c={color} key={index}>
                {value} {label}
            </Text>
        ));
    return <Breadcrumbs separator="/">{items}</Breadcrumbs>;
};

export const PokemonStats: FC<PokemonStatsProps> = (props) => {
    const p = props.pokemon;
    const name = p.name ? `${p.name} (${p.species})` : p.species;
    const item = p.item;
    const title = item ? (
        <Breadcrumbs separator="@">
            <Text>{name}</Text>
            <Group gap={5}>
                <Text>{item}</Text>
                <PokemonItem name={p.item} />
            </Group>
        </Breadcrumbs>
    ) : (
        <Text>{name}</Text>
    );

    return (
        <Paper withBorder shadow="md" p={20}>
            {title}
            <Text>Gender: {p.gender !== "" ? p.gender : "-"}</Text>
            <Text>Ability: {p.ability}</Text>
            {p.happiness !== undefined && <Text>Happiness: {p.happiness}</Text>}
            <Group>
                <Text>EVs:</Text>
                {statsComponent(p.evs)}
            </Group>
            <Text>{p.nature} Nature</Text>
            {p.shiny !== undefined && (
                <Text>Shiny: {p.shiny ? "Yes" : "No"}</Text>
            )}
            {p.level !== undefined && <Text>Level: {p.level}</Text>}
            {p.ivs && (
                <Group>
                    <Text>IVs:</Text>
                    {statsComponent(p.ivs, 31)}
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
