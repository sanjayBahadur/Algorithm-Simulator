import { AlgorithmConfig } from '../types';
import { createBinarySearchSteps, BinarySearchState, SORTED_ARRAY } from './runner';
import { BinarySearchView } from './View';

export const binarySearchConfig: AlgorithmConfig<number, BinarySearchState> = {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Efficiently find a value in a sorted array by repeatedly dividing the search interval in half.',
    initialInput: SORTED_ARRAY[7], // Default to middle element
    createSteps: createBinarySearchSteps,
    View: BinarySearchView,
};
