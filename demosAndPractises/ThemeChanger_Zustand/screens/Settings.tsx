import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-paper';
import { useThemeStore } from '../hooks/ThemeStore';

export default function Settings() {
    const isDark = useThemeStore((s) => s.isDark)
    const toggle = useThemeStore((s) => s.toggle)


  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Switch
        value={isDark}
        onValueChange={toggle}
      >
        </Switch>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
