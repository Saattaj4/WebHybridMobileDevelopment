export type StopwatchState ={
  time: number,
  isRunning: boolean
}

export type StopwatchAction =
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'RESET' }
  | { type: 'TICK' };