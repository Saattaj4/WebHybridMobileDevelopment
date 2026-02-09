import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemeState } from '../types/ThemeState'
import { useThemeStore } from '../hooks/ThemeStore'


export default function Home() {
    const isDark: ThemeState['isDark'] = useThemeStore((s: ThemeState) => s.isDark)

  return (
    <View style={[styles.container, isDark ? {backgroundColor: '#333'}: {backgroundColor: '#f5f5f5'}]}>
      <Text>Home</Text>
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
