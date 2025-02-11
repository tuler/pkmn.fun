import { Combobox, Input, InputBase, useCombobox } from "@mantine/core";
import { Dex, Format } from "@pkmn/sim";
import { FC, useState } from "react";

export interface PokemonComboboxProps {
    format: Format;
}

export const PokemonCombobox: FC<PokemonComboboxProps> = ({ format }) => {
    const [search, setSearch] = useState("");
    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption();
            combobox.focusTarget();
            setSearch("");
        },

        onDropdownOpen: () => {
            combobox.focusSearchInput();
        },
    });
    const [value, setValue] = useState<string | null>(null);

    const dex = Dex.forFormat(format);
    const species = dex.species.all();
    const options = species
        .filter((specie) =>
            specie.name.toLowerCase().includes(search.toLowerCase().trim()),
        )
        .map((specie) => (
            <Combobox.Option value={specie.id} key={specie.id}>
                {specie.name}
            </Combobox.Option>
        ));

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                setValue(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                >
                    {value || (
                        <Input.Placeholder>Select specie</Input.Placeholder>
                    )}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder="Search specie"
                />
                <Combobox.Options>
                    {options.length > 0 ? (
                        options
                    ) : (
                        <Combobox.Empty>Nothing found</Combobox.Empty>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};
