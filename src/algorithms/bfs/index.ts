import { AlgorithmConfig } from '../types';
import { createBFSSteps, BFSState } from './runner';
import { BFSView } from './View';

export const bfsConfig: AlgorithmConfig<number, BFSState> = {
    id: 'bfs',
    title: 'Breadth-First Search',
    description: 'Explores the neighbor nodes first, before moving to the next level neighbors. Uses a Queue.',
    initialInput: 0,
    createSteps: createBFSSteps,
    View: BFSView,
};
