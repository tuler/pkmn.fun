import { FC } from "react";
import { LogFormatter } from "@pkmn/view";
import { Protocol } from "@pkmn/protocol";

export interface BattleLogProps {
    log: string;
}

export const BattleLog: FC<BattleLogProps> = ({ log }) => {
    const formatter = new LogFormatter();
    const formattedLogs = Protocol.parse(log).map(({ args, kwArgs }) =>
        formatter.formatHTML(args, kwArgs),
    );

    return (
        <div>
            {formattedLogs.map((text, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: text }} />
            ))}
        </div>
    );
};
