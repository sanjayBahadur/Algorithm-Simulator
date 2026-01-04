import { Step } from '../types';
import { ADJACENCY_LIST } from '../graphData';

export interface DFSState {
    visited: number[];
    stack: number[];
    currentNode: number | null;
    currentNeighbors: number[];
}

export function createDFSSteps(startNode: number): Step<DFSState>[] {
    const steps: Step<DFSState>[] = [];

    // Initial State
    const stack: number[] = [startNode];
    const visited: Set<number> = new Set();

    steps.push({
        label: `Start DFS at node ${startNode}`,
        snapshot: {
            visited: Array.from(visited),
            stack: [...stack],
            currentNode: null,
            currentNeighbors: []
        }
    });

    while (stack.length > 0) {
        const current = stack.pop()!;

        if (visited.has(current)) {
            steps.push({
                label: `Node ${current} already visited, skipping pop`,
                snapshot: {
                    visited: Array.from(visited),
                    stack: [...stack],
                    currentNode: current,
                    currentNeighbors: []
                }
            });
            continue;
        }

        visited.add(current);

        steps.push({
            label: `Visit node ${current}`,
            snapshot: {
                visited: Array.from(visited),
                stack: [...stack],
                currentNode: current,
                currentNeighbors: []
            }
        });

        const neighbors = ADJACENCY_LIST[current] || [];
        steps.push({
            label: `Pushing neighbors of ${current} to stack`,
            snapshot: {
                visited: Array.from(visited),
                stack: [...stack],
                currentNode: current,
                currentNeighbors: neighbors
            }
        });

        // Add neighbors to stack in reverse to visit them in the order they appear in adjacency list (optional)
        const neighborsToPush = [...neighbors].reverse();
        for (const neighbor of neighborsToPush) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
                steps.push({
                    label: `Push ${neighbor} to stack`,
                    snapshot: {
                        visited: Array.from(visited),
                        stack: [...stack],
                        currentNode: current,
                        currentNeighbors: neighbors
                    }
                });
            }
        }
    }

    steps.push({
        label: "DFS Complete",
        snapshot: {
            visited: Array.from(visited),
            stack: [],
            currentNode: null,
            currentNeighbors: []
        }
    });

    return steps;
}
