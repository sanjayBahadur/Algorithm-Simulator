import { ReactNode } from 'react';

export interface Step<T> {
  label: string;
  snapshot: T;
}

export type RunnerStatus = 'idle' | 'running' | 'paused' | 'done';

export interface RunnerState {
  status: RunnerStatus;
  stepIndex: number;
  speedMs: number;
}

// TInput: The initial input type (e.g. number, array, startNode)
// TState: The structure of the snapshot at each step
export interface AlgorithmConfig<TInput, TState> {
  id: string;
  title: string;
  description: string;
  initialInput: TInput;
  /**
   * Function to generate the sequence of steps based on the input.
   * This is called on reset or when input changes.
   */
  createSteps: (input: TInput) => Step<TState>[];
  
  /**
   * The visualization component.
   */
  View: React.FC<{
    input: TInput;
    state: TState | null; // null if not started (or we can just show initial state using steps[0])
    currentStep: Step<TState> | null;
    allSteps: Step<TState>[];
    stepIndex: number;
  }>;
}
