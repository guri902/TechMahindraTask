import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import EventListScreen from '../screens/EventListScreen';
import AddEventScreen from '../screens/AddEventScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="EventList">
      <Stack.Screen name="EventList" component={EventListScreen}options={{
          title: 'Event App', 
          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24, 
            color: '#2c5896', 
            fontWeight: 'bold', 
          },
          headerStyle: {
            backgroundColor: '#77b4eb', 
          },
        }} />
      <Stack.Screen name="AddEvent" component={AddEventScreen} options={{
          title: 'Add Event', 
          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24, 
            color:'#2c5896', 
            fontWeight: 'bold', 
          },
          headerStyle: {
            backgroundColor: '#84b0b5', 
          },
        }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
