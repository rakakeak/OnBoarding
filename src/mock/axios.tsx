import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const userData = {
  email: 'rakaprathama10@gmail.com',
  password: 'deejay26Ke@k',
};

// Mock login request
mock.onPost('/login').reply(config => {
  const {email, password} = JSON.parse(config.data);
  if (email === userData.email && password === userData.password) {
    return [
      200,
      {message: 'Login successful!'},
      {Authorization: 'Bearer access-token'},
    ];
  }
  return [401, {message: 'Invalid email or password.'}];
});

// Mock register request
mock.onPost('/register').reply(config => {
  const {username, password} = JSON.parse(config.data);

  if (username === userData.email && password === userData.password) {
    return [400, {message: 'User already exists'}];
  }

  return [
    200,
    {message: 'Registration successful!'},
    {
      Authorization: 'Bearer access-token',
    },
  ];
});
