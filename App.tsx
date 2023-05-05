import {navigationRef} from '@navigations/index';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '@screens/Login/index';
import Otp from '@screens/Otp/index';
import Register from '@screens/Register/index';
import React, {useContext} from 'react';
import Welcome from 'screens/Welcome';
import {AuthContext, AuthContextProps, AuthProvider} from './src/context';

const Stack = createNativeStackNavigator();

const App = () => {
  const {isLoggedIn} = useContext<AuthContextProps>(AuthContext);

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          {isLoggedIn ? null : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Otp" component={Otp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
