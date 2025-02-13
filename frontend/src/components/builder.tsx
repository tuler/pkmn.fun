import { Alert, Button, Group, Stack, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PokemonSet } from "@pkmn/sets";
import { Format, Teams, TeamValidator } from "@pkmn/sim";
import { FC, useEffect, useState } from "react";
import { TeamGenerators } from "@pkmn/randoms";
import { TeamStats } from "./team_stats";

export interface TeamBuilderProps {
    format: Format;
    onSave: (team: PokemonSet<string>[]) => void;
}

const getRandomFormatFor = (format: Format): string => {
    return `${format.mod}randombattle`;
};

export const TeamBuilder: FC<TeamBuilderProps> = ({ format, onSave }) => {
    const [team, setTeam] = useState<PokemonSet<string>[] | null>(null);
    const [errors, setErrors] = useState<string[] | null>();
    const [importOpen, { toggle: toggleImport }] = useDisclosure();
    const [importText, setImportText] = useState<string>();

    // validator and generator for the given format
    const validator = TeamValidator.get(format);
    const generator = TeamGenerators.getTeamGenerator(
        getRandomFormatFor(format),
    );

    // team validation
    useEffect(() => {
        if (team) {
            setErrors(validator.validateTeam(team));
        }
    }, [team]);

    const importTeam = () => {
        if (importOpen && importText) {
            const team = Teams.import(importText);
            if (team) {
                // set the team
                setTeam(team);

                // clear the textarea
                setImportText("");

                // hide the textarea
                toggleImport();
            }
        } else {
            // hide/show textarea
            toggleImport();
        }
    };

    const save = () => {
        if (team) {
            onSave(team);
        }
    };

    return (
        <Stack>
            <Group justify="center">
                <Button
                    onClick={() => setTeam(generator.getTeam())}
                    variant="gradient"
                >
                    I'm feeling lucky!
                </Button>
                <Button
                    onClick={() =>
                        window.open(
                            "https://play.pokemonshowdown.com/teambuilder",
                            "_blank",
                        )
                    }
                    variant="gradient"
                >
                    Team Builder
                </Button>
                <Button onClick={() => importTeam()} variant="gradient">
                    Import Team
                </Button>
                <Button
                    onClick={save}
                    variant="gradient"
                    disabled={!team || !!errors}
                >
                    Save
                </Button>
            </Group>
            {errors?.map((error, index) => (
                <Alert key={index} color="red">
                    {error}
                </Alert>
            ))}
            {importOpen && (
                <Textarea
                    rows={10}
                    ff="monospace"
                    placeholder='Paste here team export text and click "Import Team"'
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                />
            )}
            <TeamStats team={team} />
        </Stack>
    );
};
