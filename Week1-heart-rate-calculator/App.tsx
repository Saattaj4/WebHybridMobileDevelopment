import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [age, setAge] = useState<string>(''); // Store age input as string

  // State for calculated heart rate limit
  const [lower, setLower] = useState<number>(0); 
  const [upper, setUpper] = useState<number>(0);

  // Calculate heart reate limits
  const calculate = (value: string): void => {
    setAge(value);

    const numericAge = parseInt(value, 10);

    // No numbers - show only 0
    if (isNaN(numericAge)) {
      setLower(0);
      setUpper(0);
      return;
    }

    // Heart rate max = 220 - age
    const maxHr = 220 - numericAge;
    setLower(maxHr * 0.65);
    setUpper(maxHr * 0.85);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heart Rate Limits Calculator</Text>

      <Text>Enter your age:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={calculate}  // Calculating on new keystroke
      />

      <Text>Lower limit: {lower.toFixed(2)} bpm</Text>
      <Text>Upper limit: {upper.toFixed(2)} bpm</Text>
    </View>
  );
}

// Styles for boxes.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 12,
  },
});
