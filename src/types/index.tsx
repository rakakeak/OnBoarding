export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Otp: {username: string; password: string};
  Welcome: undefined;
};

export type User = {
  username: string;
  password: string;
};
