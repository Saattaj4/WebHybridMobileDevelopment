import { useReducer, useRef } from "react";
import { StopwatchAction, StopwatchState } from "../types/StopwatchTypes";

  const initialState: StopwatchState = {
    time: 0,
    isRunning: false
  };

  const stopwatchReducer = (state: StopwatchState, action: StopwatchAction):
  StopwatchState => {
    switch (action.type) {

      case 'START':
    return { ...state, isRunning: true };

      case 'STOP':
    return { ...state, isRunning: false }; 


    case 'RESET':
      return { time: 0, isRunning: false }; 

    case 'TICK':
      return { ...state, time: state.time + 1 }; 
            default: 
            return state
  }
}

export const useStopwatch = () => {
    const [state, dispatch] = useReducer(stopwatchReducer, initialState)
    const timerRef = useRef<NodeJS.Timeout | null>(null);

        const handleStart = () => {
      if (!state.isRunning) {
        dispatch({ type: 'START' });
        timerRef.current = setInterval(() => {
          dispatch({ type: 'TICK' });
      },1000)
    }
    }

    const handleStop = () => {
      if (state.isRunning && timerRef.current) {
        dispatch({ type: 'STOP' });
        clearInterval(timerRef.current);
      }
    }

    const handleReset = () => {
      if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null
      }
      dispatch({ type: 'RESET' });
    }

    return {
        state,
        handleStart,
        handleStop,
        handleReset
    }
}