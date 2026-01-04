import { Step } from '../types';

export const SORTED_ARRAY = [2, 5, 8, 12, 16, 23, 38, 42, 50, 64, 72, 85, 91, 100, 110];

export interface BinarySearchState {
    array: number[];
    low: number;
    mid: number;
    high: number;
    target: number;
    foundIndex: number | null;
    comparison: 'none' | 'less' | 'greater' | 'equal';
}

export function createBinarySearchSteps(target: number): Step<BinarySearchState>[] {
    const steps: Step<BinarySearchState>[] = [];
    const array = SORTED_ARRAY;

    let low = 0;
    let high = array.length - 1;

    steps.push({
        label: `Start Binary Search for ${target}`,
        snapshot: {
            array,
            low,
            high,
            mid: -1,
            target,
            foundIndex: null,
            comparison: 'none'
        }
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        steps.push({
            label: `Calculate mid: index ${mid}`,
            snapshot: {
                array,
                low,
                high,
                mid,
                target,
                foundIndex: null,
                comparison: 'none'
            }
        });

        const value = array[mid];

        if (value === target) {
            steps.push({
                label: `Found! ${value} equals ${target}`,
                snapshot: {
                    array,
                    low,
                    high,
                    mid,
                    target,
                    foundIndex: mid,
                    comparison: 'equal'
                }
            });
            return steps;
        } else if (value < target) {
            steps.push({
                label: `${value} < ${target}, move low to ${mid + 1}`,
                snapshot: {
                    array,
                    low,
                    high,
                    mid,
                    target,
                    foundIndex: null,
                    comparison: 'less'
                }
            });
            low = mid + 1;
        } else {
            steps.push({
                label: `${value} > ${target}, move high to ${mid - 1}`,
                snapshot: {
                    array,
                    low,
                    high,
                    mid,
                    target,
                    foundIndex: null,
                    comparison: 'greater'
                }
            });
            high = mid - 1;
        }

        steps.push({
            label: `Range updated to [${low}, ${high}]`,
            snapshot: {
                array,
                low,
                high,
                mid: -1,
                target,
                foundIndex: null,
                comparison: 'none'
            }
        });
    }

    steps.push({
        label: `${target} not found in array`,
        snapshot: {
            array,
            low,
            high,
            mid: -1,
            target,
            foundIndex: -1,
            comparison: 'none'
        }
    });

    return steps;
}
