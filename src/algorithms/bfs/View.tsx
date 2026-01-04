import React from 'react';
import { BFSState } from './runner';
import { NODE_POSITIONS, ADJACENCY_LIST } from '../graphData';
import { Step } from '../types';

interface ViewProps {
    input: number;
    state: BFSState | null;
    currentStep: Step<BFSState> | null;
}

export const BFSView: React.FC<ViewProps> = ({ state }) => {
    // If no state, show initial (empty)
    const safeState = state || { visited: [], queue: [], currentNode: null, currentNeighbors: [] };
    const { visited, queue, currentNode, currentNeighbors } = safeState;

    // Compute edges to render
    const edges = [];
    for (const [uStr, neighbors] of Object.entries(ADJACENCY_LIST)) {
        const u = parseInt(uStr);
        for (const v of neighbors) {
            // Avoid duplicates if undirected, but ADJACENCY_LIST is directed-like structure here although meant to be unweighted graph. 
            // We'll just draw all defined edges. To avoid double drawing, check u < v?
            // The list contains back edges too (0->1 and 1->0). Let's draw unique lines.
            if (u < v) {
                edges.push({ u, v });
            }
        }
    }

    return (
        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-[80%] h-full overflow-visible">
                {/* Edges */}
                {edges.map(({ u, v }) => {
                    const start = NODE_POSITIONS[u];
                    const end = NODE_POSITIONS[v];
                    const isHighlighted = (currentNode === u && currentNeighbors.includes(v)) || (currentNode === v && currentNeighbors.includes(u));

                    return (
                        <line
                            key={`${u}-${v}`}
                            x1={start.x} y1={start.y}
                            x2={end.x} y2={end.y}
                            stroke={isHighlighted ? "#ffff00" : "#1a1a3a"} // neon-yellow vs dark blue
                            strokeWidth={isHighlighted ? 1 : 0.5}
                            className="transition-colors duration-300"
                        />
                    );
                })}

                {/* Nodes */}
                {Object.entries(NODE_POSITIONS).map(([idStr, pos]) => {
                    const id = parseInt(idStr);
                    const isCurrent = currentNode === id;
                    const isVisited = visited.includes(id);
                    const isQueued = queue.includes(id);

                    let fill = "#0a0a1a"; // basic dark
                    let stroke = "#00ffff"; // neon-blue
                    let shadowClass = "";

                    if (isCurrent) {
                        fill = "#ffff00"; // yellow
                        stroke = "#ffff00";
                        shadowClass = "filter drop-shadow(0 0 5px #ffff00)";
                    } else if (isQueued) {
                        fill = "#0a0a1a";
                        stroke = "#ff00ff"; // pink
                        shadowClass = "filter drop-shadow(0 0 3px #ff00ff)";
                    } else if (isVisited) {
                        fill = "#00ff00"; // green
                        stroke = "#00ff00";
                        shadowClass = "";
                    } else {
                        stroke = "#1a1a3a"; // dim
                    }

                    return (
                        <g key={id} className={`transition-all duration-300 ${shadowClass}`}>
                            <circle
                                cx={pos.x} cy={pos.y}
                                r="4"
                                fill={fill === "#0a0a1a" ? "#0a0a1a" : fill}
                                fillOpacity={fill === "#0a0a1a" ? 1 : 0.8}
                                stroke={stroke}
                                strokeWidth="0.8"
                            />
                            <text
                                x={pos.x} y={pos.y}
                                dy=".3em"
                                textAnchor="middle"
                                fontSize="3"
                                fill={isCurrent ? "#000" : stroke}
                                fontWeight="bold"
                            >
                                {id}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Queue Visualization */}
            <div className="mt-4 flex gap-2 items-center h-8">
                <span className="text-neon-blue text-xs uppercase font-bold">Queue:</span>
                <div className="flex gap-1 border border-card-border p-1 bg-black/50 min-w-[100px]">
                    {queue.map((q, i) => (
                        <div key={`${q}-${i}`} className="w-6 h-6 flex items-center justify-center border border-neon-pink text-neon-pink text-xs font-bold bg-pink-900/20">
                            {q}
                        </div>
                    ))}
                    {queue.length === 0 && <span className="text-gray-600 text-xs">Empty</span>}
                </div>
            </div>
        </div>
    );
};
