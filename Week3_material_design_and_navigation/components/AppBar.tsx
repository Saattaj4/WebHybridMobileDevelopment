import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

export default function CustomAppBar({ navigation, back, route }: NativeStackHeaderProps) {
    const { colors } = useTheme();

        // style={{ backgroundColor: colors.primary }} lisää väriä AppBariin
  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }}> 
      {back ? (
        <Appbar.BackAction 
            onPress={navigation.goBack}
            color="#ff00eeff"
            size={30} />
      ) : (
        <Appbar.Action
          icon="arrow-right"
          onPress={() => 
            navigation.navigate('Details')}
            color="#ff00eeff"
            size={30}
        />
      )}
      <Appbar.Content title={route.name} />
    </Appbar.Header>
  );
}
