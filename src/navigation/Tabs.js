import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen  from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import SettingsScreen from '../screens/SettingsScreen';

// This function displays only the Leaderboard Display and Settings bottom tabs
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>

      <Tab.Screen 
        name="Welcome" 
        component={HomeScreen}
        options={{
          headerTintColor: '#2e64e5',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),            
        }} />

      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen}
        options={{
          headerTintColor: '#2e64e5',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" color={color} size={size} />
          ),
        }} />

      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          headerTintColor: '#2e64e5',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color={color} size={size} />
          ),
        }} />
    
    </Tab.Navigator>
  );
}

// This function displays the Login, Leaderboard Display, and Settings bottom tabs
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabs;