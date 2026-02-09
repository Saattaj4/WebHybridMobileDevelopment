import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

const MyAppBar = (props: NativeStackHeaderProps) => {
    const { navigation, route, options } = props as NativeStackHeaderProps;

    const title:string = (options && options.title || route?.name || 'Title')
    const canGoBack = navigation.canGoBack ? navigation.canGoBack() : false
    
    return (
  <Appbar.Header>
    { canGoBack ? (
        <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        ) : null }
    <Appbar.Content title={title} />
    <Appbar.Action icon="cog" onPress={() => {navigation.navigate('Settings')}} />
  </Appbar.Header>
    )
}

export default MyAppBar;