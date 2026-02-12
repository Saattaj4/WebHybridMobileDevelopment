import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Not Authenticated');

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricSupported(compatible && enrolled);
  };

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const authenticate = async () => {
    try {
      const biometricAut = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        fallbackLabel: 'Enter Password',
        cancelLabel: 'Cancel',
      });
      if (biometricAut.success) {
        setStatus('Authenticated');
      } else {
        setStatus('Authentication Failed');
      }
    } catch (error) {
      console.log('Error in authentication' + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Biometric support: {isBiometricSupported ? 'Available' : 'Not Available'}
      </Text>
      <Button title="Authenticate" disabled={!isBiometricSupported} onPress={authenticate} />
      <Text style={styles.text}>{status}</Text>
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
  text: {
    margin: 16,
    fontSize: 24,
  },
});