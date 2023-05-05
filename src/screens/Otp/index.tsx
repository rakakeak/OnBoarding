import OtpInput from '@components/Otp';
import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useHandleOtp from './function';

const OTPScreen: React.FC = () => {
  const {
    code,
    disableResend,
    countdown,
    handleCodeInput,
    handleResend,
    handleKeyPress,
    refs,
    errorCode,
  } = useHandleOtp();

  const otpInputs = useMemo(() => {
    return code.map((value, index) => (
      <OtpInput
        key={index}
        value={value}
        onChangeText={val => handleCodeInput(val, index)}
        onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent, index)}
        focusRef={refs[index]}
        maxLength={1}
      />
    ));
  }, [code, refs, handleCodeInput, handleKeyPress]);

  return (
    <View style={styles.container}>
      <View style={styles.codeContainer}>{otpInputs}</View>
      {errorCode !== '' && <Text style={styles.errorMessage}>{errorCode}</Text>}
      <TouchableOpacity
        onPress={handleResend}
        disabled={disableResend}
        style={[styles.resendButton, disableResend && styles.disabledButton]}>
        <Text style={styles.resendButtonText}>
          {disableResend ? `Resend in ${countdown}s` : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resendButton: {
    backgroundColor: '#3F51B5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  resendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default OTPScreen;
