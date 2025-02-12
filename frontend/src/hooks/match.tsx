import { Address, Hash, Hex } from "viem";
import {
    useReadPkmnv1Matches,
    useReadPkmnv1PlayerActiveMatch,
} from "./contracts";

export enum MatchPhase {
    COMMIT, // Players submit team hashes
    REVEAL, // Players reveal their teams
    BATTLE, // Match is simulated
    COMPLETED, // Match is finished
}

export type Match = {
    player1: Address;
    player2: Address;
    player1TeamHash: Hash;
    player2TeamHash: Hash;
    player1TeamData: Hex;
    player2TeamData: Hex;
    revealDeadline: bigint;
    phase: MatchPhase;
    outcome: number;
    winner: Address;
    description: Hex;
};

export const useMatch = (id?: bigint) => {
    const read = useReadPkmnv1Matches({
        args: [id!],
        query: { enabled: !!id },
    });

    const { data } = read;
    const match: Match | undefined = data
        ? {
              player1: data[0],
              player2: data[1],
              player1TeamHash: data[2],
              player2TeamHash: data[3],
              player1TeamData: data[4],
              player2TeamData: data[5],
              revealDeadline: data[6],
              phase: data[7],
              outcome: data[8],
              winner: data[9],
              description: data[10],
          }
        : undefined;

    return { match, ...read };
};

export const usePlayerMatch = (address?: Address) => {
    const { data: id } = useReadPkmnv1PlayerActiveMatch({
        args: [address!],
        query: { enabled: !!address },
    });
    return useMatch(id);
};
