import axios, {AxiosResponse} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {AuthContext, AuthContextProps} from 'context';
import {replace} from 'navigations';
import {useContext, useState} from 'react';
import {saveData} from 'utils/storage';
import {Alert} from 'react-native';

interface LoginResponseData {
  message: string;
  email: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const userData = {
  email: 'raka@gmail.com',
  password: '@Raka123',
};

const mock = new MockAdapter(axios);

// Mock login request
mock.onPost('/login').reply(config => {
  const {email, password} = JSON.parse(config.data) as LoginRequestBody;
  if (email === userData.email && password === userData.password) {
    return [
      200,
      {message: 'Login successful!', email},
      {Authorization: 'Bearer access-token'},
    ];
  }
  return [401, {message: 'Invalid email or password.'}];
});

const useHandleLogin = () => {
  const {setIsLoggedIn} = useContext<AuthContextProps>(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleEmailChange = (value: string) => {
    setEmail(value);

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    // Check if password meets the validation criteria
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        'Password must contain at least 8 characters, an uppercase letter, a lowercase letter, and a symbol.',
      );
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    // Validate input before submitting
    if (emailError || passwordError) {
      return;
    }

    // Call the mock API instead of the actual one
    axios
      .post<LoginRequestBody, AxiosResponse<LoginResponseData>>('/login', {
        email,
        password,
      })
      .then(response => {
        if (response.status === 200) {
          saveData('EMAIL_USER', response.data.email);
          saveData('isLoggedIn', 'true').then(() => {
            setIsLoggedIn(true);
            replace('Welcome');
          });
        } else {
          Alert.alert(response.data.message);
        }
      })
      .catch(error => {
        Alert.alert(error.response.data.message);
      });
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
};

export default useHandleLogin;
