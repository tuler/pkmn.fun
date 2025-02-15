export const calculateEloDelta = (
    elo1: number,
    elo2: number,
    winner: 0 | 1 | 2
): number => {
    const k = 32;
    const expected1 = 1 / (1 + Math.pow(10, (elo2 - elo1) / 400));
    const actual1 = winner === 1 ? 1 : winner === 2 ? 0 : 0.5;
    return Math.round(k * (actual1 - expected1));
};
