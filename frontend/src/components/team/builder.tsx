import { Alert, NavLink, Stack, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TeamGenerators } from "@pkmn/randoms";
import { PokemonSet } from "@pkmn/sets";
import { Format, Teams, TeamValidator } from "@pkmn/sim";
import {
    IconCheck,
    IconClipboardText,
    IconExternalLink,
    IconGeometry,
    IconMoodCrazyHappy,
} from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { TeamDetails } from "./details";

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

    // import team using the import text
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

    // generate a random team
    const generateTeam = () => {
        // try 100 times to generate a valid team
        // because generator can return invalid teams
        for (let i = 0; i < 100; i++) {
            const team = generator.getTeam();
            const errors = validator.validateTeam(team);
            if (errors === null || errors.length === 0) {
                setTeam(team);
                return;
            }
        }
    };

    // save the team only if it's valid
    // save button is disabled if the team is not valid
    const save = () => {
        if (team) {
            onSave(team);
        }
    };

    return (
        <Stack>
            <Stack gap={0}>
                <NavLink
                    label="I'm feeling lucky!"
                    variant="subtle"
                    active
                    onClick={generateTeam}
                    leftSection={<IconMoodCrazyHappy />}
                />
                <NavLink
                    label="Team Builder"
                    variant="subtle"
                    onClick={() =>
                        window.open(
                            "https://play.pokemonshowdown.com/teambuilder",
                            "_blank",
                        )
                    }
                    active
                    leftSection={<IconGeometry />}
                    rightSection={<IconExternalLink />}
                />
                <NavLink
                    label={
                        importOpen && importText !== ""
                            ? "Import"
                            : "Import Team"
                    }
                    variant={
                        importOpen && importText !== "" ? "filled" : "subtle"
                    }
                    onClick={importTeam}
                    active
                    leftSection={<IconClipboardText />}
                />
                <NavLink
                    label="Save"
                    variant="filled"
                    onClick={save}
                    active
                    disabled={!team || !!errors}
                    leftSection={<IconCheck />}
                />
            </Stack>
            {importOpen && (
                <Textarea
                    rows={20}
                    ff="monospace"
                    placeholder='Paste here team export text and click "Import Team"'
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                />
            )}
            {errors?.map((error, index) => (
                <Alert key={index} color="red">
                    {error}
                </Alert>
            ))}
            <TeamDetails team={team} />
        </Stack>
    );
};
