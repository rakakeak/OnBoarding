import {getData, removeData} from '@utils/storage/index';
import Button from 'components/Button';
import {reset} from 'navigations';
import React, {useEffect, useState} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';

type Props = {};

const Welcome: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getEmailFromStorage = async () => {
      const emailFromStorage = await getData('EMAIL_USER');
      setEmail(emailFromStorage ?? '');
    };

    getEmailFromStorage();
  }, []);

  const handleLogout = async () => {
    await removeData('isLoggedIn');
    await removeData('EMAIL_USER');

    reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Welcome</Text>
      <Text>{email}</Text>
      <Button title="LogOut" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Welcome;
