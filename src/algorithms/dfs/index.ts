import { AlgorithmConfig } from '../types';
import { createDFSSteps, DFSState } from './runner';
import { DFSView } from './View';

export const dfsConfig: AlgorithmConfig<number, DFSState> = {
    id: 'dfs',
    title: 'Depth-First Search',
    description: 'Explores as far as possible along each branch before backtracking. Uses a Stack.',
    initialInput: 0,
    createSteps: createDFSSteps,
    View: DFSView,
};
