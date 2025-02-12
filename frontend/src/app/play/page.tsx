"use client";

import { CommitMatch } from "@/components/commit";
import { Stack } from "@mantine/core";
import { Teams } from "@pkmn/sim";

const exp = `Raichu  
Ability: No Ability  
EVs: 252 HP / 252 Atk / 252 Def / 252 SpA / 252 Spe  
Serious Nature  
- Rest  
- Substitute  
- Body Slam  
- Thunder Wave  

Chansey (F)  
Ability: No Ability  
- Reflect  
- Substitute  
- Seismic Toss  
- Submission  

Zapdos  
Ability: No Ability  
- Hyper Beam  
- Reflect  
- Thunder Wave  
- Agility  

Dodrio  
Ability: No Ability  
- Drill Peck  
- Body Slam  
- Rest  
- Substitute  

Moltres  
Ability: No Ability  
EVs: 252 HP / 252 Atk / 252 Def / 252 SpA / 252 Spe  
Serious Nature  
- Double-Edge  
- Fire Spin  
- Reflect  
- Substitute  

Magneton  
Ability: No Ability  
- Reflect  
- Double-Edge  
- Substitute  
- Thunderbolt  
`;

function Play() {
    const team = Teams.import(exp);
    return (
        <Stack gap={50} p={100}>
            {team && <CommitMatch team={team} />}
        </Stack>
    );
}

export default Play;
