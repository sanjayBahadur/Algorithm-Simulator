export const ADJACENCY_LIST: Record<number, number[]> = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5, 6],
    3: [1, 7],
    4: [1, 7],
    5: [2],
    6: [2],
    7: [3, 4]
};

export const NODE_POSITIONS: Record<number, { x: number, y: number }> = {
    0: { x: 50, y: 10 },
    1: { x: 30, y: 40 },
    2: { x: 70, y: 40 },
    3: { x: 20, y: 70 },
    4: { x: 40, y: 70 },
    5: { x: 60, y: 70 },
    6: { x: 80, y: 70 },
    7: { x: 30, y: 90 },
};
