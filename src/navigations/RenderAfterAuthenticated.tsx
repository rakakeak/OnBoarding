import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Welcome from 'screens/Welcome';

const Stack = createNativeStackNavigator();

const RenderAfterAuthenticated: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default RenderAfterAuthenticated;
