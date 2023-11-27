import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PlotterScreen from './src/screens/PlotterScreen';

const Stack = createNativeStackNavigator();

function App() {
  console.log("Rendering App component");
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Plotter" component={PlotterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;