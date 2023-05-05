import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface Props {
  maxLength?: number;
  value: string;
  onKeyPress: (event: any) => void;
  onChangeText: (event: any) => void;
  focusRef: React.RefObject<TextInput>;
}

const OtpInput: React.FC<Props> = React.memo(
  ({maxLength = 1, value, onKeyPress, onChangeText, focusRef}) => {
    return (
      <TextInput
        maxLength={maxLength}
        value={value}
        keyboardType="numeric"
        onChangeText={onChangeText}
        style={styles.codeInput}
        onKeyPress={onKeyPress}
        ref={focusRef}
      />
    );
  },
);

const styles = StyleSheet.create({
  codeInput: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    minWidth: 50,
  },
});

export default OtpInput;
