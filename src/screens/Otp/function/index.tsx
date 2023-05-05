import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthContext, AuthContextProps} from 'context';
import {replace} from 'navigations';
import {RootStackParamList} from 'navigations/types';
import {useContext, useEffect, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';
import {saveData} from 'utils/storage';

type UseHandleOtpReturnType = {
  code: string[];
  disableResend: boolean;
  countdown: number;
  handleCodeInput: (value: string, index: number) => void;
  handleResend: () => void;
  handleKeyPress: (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => void;
  refs: any;
  errorCode: string;
};

type OtpScreenRouteProps = RouteProp<RootStackParamList, 'OtpScreen'>;

const useHandleOtp = (): UseHandleOtpReturnType => {
  const route = useRoute<OtpScreenRouteProps>();
  const {email} = route.params;
  const {setIsLoggedIn} = useContext<AuthContextProps>(AuthContext);
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [errorCode, setErrorCode] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [disableResend, setDisableResend] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          setDisableResend(false);
          clearInterval(timerRef.current!);
          return 30;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);

    // Clear timer on unmount
    return () => {
      clearInterval(timerRef.current!);
    };
  }, []);

  useEffect(() => {
    refs[0].current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleCodeInput = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value === '' && index > 0) {
      // Move focus to previous input if there is one
      setCurrentIndex(prevIndex => prevIndex - 1);
      refs[index - 1].current?.focus();
    } else if (index < 5) {
      if (currentIndex === 0 && errorCode !== '') {
        setErrorCode('');
      }
      setCurrentIndex(prevIndex => prevIndex + 1);
      refs[index + 1].current?.focus();
    } else {
      // Submit OTP if all fields are filled
      const otp = newCode.join('');
      if (otp === '111111') {
        saveData('EMAIL_USER', email);
        saveData('isLoggedIn', 'true').then(() => {
          setIsLoggedIn(true);
          replace('Welcome');
        });
      } else {
        // Clear OTP code and reset focus to the first input field
        setCode(['', '', '', '', '', '']);
        setCurrentIndex(0);
        refs[0].current?.focus();
        setErrorCode('Wrong Code. Please Try Again Or Resend OTP');
      }
    }
  };

  const handleResend = () => {
    // Reset OTP code and countdown timer
    setErrorCode('');
    setCode(['', '', '', '', '', '']);
    setCurrentIndex(0);
    setDisableResend(true);
    setCountdown(30);
    refs[0].current?.focus();

    // Start countdown timer again
    timerRef.current = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          setDisableResend(false);
          clearInterval(timerRef.current!);
          return 30;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);
  };

  const handleKeyPress = (nativeEvent: any, index: number) => {
    if (nativeEvent.key === 'Backspace') {
      if (code[index] === '' && index > 0) {
        // Move focus to previous input if there is one
        setCurrentIndex(prevIndex => prevIndex - 1);
        refs[index - 1].current?.focus();
        // Delete the value of the previous input field
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      } else if (index > 0) {
        handleCodeInput('', index);
      }
    }
  };

  return {
    code,
    disableResend,
    countdown,
    handleCodeInput,
    handleResend,
    handleKeyPress,
    refs,
    errorCode,
  };
};

export default useHandleOtp;
