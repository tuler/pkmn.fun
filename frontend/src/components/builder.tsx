import { Alert, NavLink, Stack, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PokemonSet } from "@pkmn/sets";
import { Format, Teams, TeamValidator } from "@pkmn/sim";
import { FC, useEffect, useState } from "react";
import { TeamGenerators } from "@pkmn/randoms";
import { TeamStats } from "./team_stats";
import {
    IconCheck,
    IconClipboardText,
    IconExternalLink,
    IconGeometry,
    IconMoodCrazyHappy,
} from "@tabler/icons-react";

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
            <Stack gap={0}>
                <NavLink
                    label="I'm feeling lucky!"
                    variant="subtle"
                    active
                    onClick={() => setTeam(generator.getTeam())}
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
            <TeamStats team={team} />
        </Stack>
    );
};
