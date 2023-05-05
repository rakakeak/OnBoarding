import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '@screens/Login/index';
import Otp from '@screens/Otp/index';
import Register from '@screens/Register/index';

const Stack = createNativeStackNavigator();

const RenderBeforeAuthenticated: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Otp" component={Otp} />
  </Stack.Navigator>
);

export default RenderBeforeAuthenticated;
