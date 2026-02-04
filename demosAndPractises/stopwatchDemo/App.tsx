import { StatusBar } from 'expo-status-bar';
import { useReducer, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StopwatchState, StopwatchAction } from './types/StopwatchTypes';
import StopwatchButton from './components/StopwatchButton';
import { useStopwatch } from './hooks/useStopwatch';





export default function App() {
  const { state, handleStart,handleStop, handleReset } = useStopwatch();




      
        return (
    <View style={styles.container}>
      <Text>{state.time}</Text>
      <View style={styles.buttons}>

        <StopwatchButton 
          title="Start"
          onPress={handleStart}
          disabled={state.isRunning}
        />

          <StopwatchButton 
          title="Stop"
          onPress={handleStop}
          disabled={!state.isRunning}
        />

          <StopwatchButton 
          title="Reset"
          onPress={handleReset}
        />

        </View>
      <Text>Status: {state.isRunning ? 'Running...' : 'Stopped' }</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 24,
  }
});
