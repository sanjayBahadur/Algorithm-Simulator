import { AlgorithmConfig } from './types';
import { bfsConfig } from './bfs';
import { dfsConfig } from './dfs';
import { binarySearchConfig } from './binary-search';

export const algorithms: AlgorithmConfig<any, any>[] = [
    bfsConfig,
    dfsConfig,
    binarySearchConfig,
];

export const getAlgorithm = (id: string) => algorithms.find(a => a.id === id);
