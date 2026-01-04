import { Step } from '../types';
import { ADJACENCY_LIST } from '../graphData';

export interface BFSState {
    visited: number[];
    queue: number[];
    currentNode: number | null;
    currentNeighbors: number[]; // Neighbors of current node being considered
}

export function createBFSSteps(startNode: number): Step<BFSState>[] {
    const steps: Step<BFSState>[] = [];

    // Initial State
    const queue: number[] = [startNode];
    const visited: Set<number> = new Set([startNode]);

    steps.push({
        label: `Start BFS at node ${startNode}`,
        snapshot: {
            visited: Array.from(visited),
            queue: [...queue],
            currentNode: null,
            currentNeighbors: []
        }
    });

    while (queue.length > 0) {
        const current = queue.shift()!;

        steps.push({
            label: `Dequeue node ${current}`,
            snapshot: {
                visited: Array.from(visited),
                queue: [...queue],
                currentNode: current,
                currentNeighbors: []
            }
        });

        const neighbors = ADJACENCY_LIST[current] || [];
        steps.push({
            label: `Inspect neighbors of ${current}: [${neighbors.join(', ')}]`,
            snapshot: {
                visited: Array.from(visited),
                queue: [...queue],
                currentNode: current,
                currentNeighbors: neighbors
            }
        });

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                steps.push({
                    label: `Visit neighbor ${neighbor} and enqueue`,
                    snapshot: {
                        visited: Array.from(visited),
                        queue: [...queue],
                        currentNode: current,
                        currentNeighbors: neighbors
                    }
                });
            } else {
                steps.push({
                    label: `Neighbor ${neighbor} already visited, skipping`,
                    snapshot: {
                        visited: Array.from(visited),
                        queue: [...queue],
                        currentNode: current,
                        currentNeighbors: neighbors
                    }
                });
            }
        }
    }

    steps.push({
        label: "BFS Complete",
        snapshot: {
            visited: Array.from(visited),
            queue: [],
            currentNode: null,
            currentNeighbors: []
        }
    });

    return steps;
}
