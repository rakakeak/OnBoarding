import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  const buttonStyle = {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    ...style,
  } as ViewStyle;

  const buttonTextStyle = {
    color: '#fff',
    fontWeight: 'bold',
    ...textStyle,
  } as TextStyle;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

// export const LoginButton: React.FC<LoginButtonProps> = ({onPress}) => {
//   return (
//     <CustomButton
//       text="Login"
//       onPress={onPress}
//       style={{
//         backgroundColor: '#007AFF',
//         borderRadius: 5,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         marginBottom: 10,
//         width: '100%',
//         alignItems: 'center',
//       }}
//     />
//   );
// };

// export const RegisterButton: React.FC<LoginButtonProps> = ({onPress}) => {
//   return (
//     <CustomButton
//       text="Register"
//       onPress={onPress}
//       style={{
//         backgroundColor: '#007aff',
//         borderRadius: 5,
//         paddingVertical: 10,
//         marginTop: 20,
//       }}
//     />
//   );
// };

// interface SubmitButtonProps extends TouchableOpacityProps {
//   onPress: () => void;
// }

// export const SubmitButton: React.FC<SubmitButtonProps> = ({onPress}) => {
//   return (
//     <CustomButton
//       text="Submit"
//       onPress={onPress}
//       style={{
//         backgroundColor: '#007AFF',
//         borderRadius: 5,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         marginBottom: 10,
//         width: '100%',
//         alignItems: 'center',
//       }}
//     />
//   );
// };

// interface ResendButtonProps {
//   handleResend: () => void;
//   disableResend: boolean;
//   countdown: number;
// }

// export const ResendButton: React.FC<ResendButtonProps> = ({
//   handleResend,
//   disableResend,
//   countdown,
// }) => {
//   return (
//     <CustomButton
//       text={disableResend ? `Resend in ${countdown}s` : 'Resend OTP'}
//       onPress={handleResend}
//       style={[
//         {
//           backgroundColor: '#3F51B5',
//           paddingHorizontal: 20,
//           paddingVertical: 10,
//           borderRadius: 5,
//         },
//         disableResend && {opacity: 0.5},
//       ]}
//     />
//   );
// };
