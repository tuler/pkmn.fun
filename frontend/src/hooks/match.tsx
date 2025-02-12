import { Address, Hash, Hex } from "viem";
import { useReadPkmnv1Matches } from "./contracts";

export type Match = {
    player1: Address;
    player2: Address;
    player1TeamHash: Hash;
    player2TeamHash: Hash;
    player1TeamData: Hex;
    player2TeamData: Hex;
    revealDeadline: bigint;
    phase: number;
    outcome: number;
    winner: Address;
    description: Hex;
};

export const useMatch = (id: bigint) => {
    const read = useReadPkmnv1Matches({
        args: [id],
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
