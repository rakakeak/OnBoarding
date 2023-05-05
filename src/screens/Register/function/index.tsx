import axios from 'axios';
import {useState} from 'react';
import MockAdapter from 'axios-mock-adapter';
import {navigate} from '@navigations/index';
import {Alert} from 'react-native';

const mock = new MockAdapter(axios);

const userData = {
  email: 'keak@gmail.com',
  password: 'deejay26Ke@k',
};

// Variable untuk menyimpan email yang terdaftar
let registeredEmails = [];

// Mock register request
mock.onPost('/register').reply(config => {
  const {email, password} = JSON.parse(config.data);

  // Validation checks
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,32}$/;
  if (!passwordRegex.test(password)) {
    return [400, {message: 'Password does not meet requirements'}];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return [400, {message: 'Invalid email format'}];
  }

  if (email === userData.email && password === userData.password) {
    return [400, {message: 'User already exists'}];
  }

  // Add registered email to array
  registeredEmails.push(email);

  // Registration successful
  return [
    200,
    {message: 'Registration successful!', email},
    {
      Authorization: 'Bearer access-token',
    },
  ];
});

interface RegisterData {
  email: string;
  password: string;
}

interface RegisterError {
  emailError: string;
  passwordError: string;
}

const useHandleRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegistration = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      setPasswordError('');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,32}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 special character (@#$%) and at most 32 characters.',
      );
      setEmailError('');
      return;
    }

    setEmailError('');
    setPasswordError('');

    // Send registration request to server
    try {
      const response = await axios.post('/register', {email, password});
      if (response.status === 200) {
        navigate('Otp', {
          email: response.data.email,
        });
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error: any) {
      Alert.alert(error.response.data.message);
    }
  };

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  const registerData: RegisterData = {email, password};
  const registerError: RegisterError = {emailError, passwordError};

  return {
    handleRegistration,
    handleInputChange,
    registerData,
    registerError,
  };
};

export default useHandleRegister;
