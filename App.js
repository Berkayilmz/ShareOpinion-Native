import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileDetailScreen from './src/screens/ProfileDetailScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "HomeScreen" }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: "Signup" }} />
        <Stack.Screen name="ProfileDetailScreen" component={ProfileDetailScreen} options={{ title: "ProfileDetailScreen" }}/>
        <Stack.Screen name="CreateNoteScreen" component={CreateNoteScreen} options={{title: "Create a Note"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
