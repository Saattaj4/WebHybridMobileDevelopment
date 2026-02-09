import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackHeaderProps } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { RootStackParamList } from "./types/RootStackParamList";
import MyAppBar from "./components/MyAppBar";
import Settings from "./screens/Settings";

const Stack = createNativeStackNavigator<RootStackParamList>()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props: NativeStackHeaderProps) => <MyAppBar {...props} />
      }}
      >
      
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

