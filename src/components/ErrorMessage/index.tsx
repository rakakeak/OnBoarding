import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

interface Props {
  error: string;
  style?: TextStyle;
}

const ErrorMessage: React.FC<Props> = ({error, style}) => {
  if (!error) {
    return null;
  }
  return <Text style={[styles.errorMessage, style]}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default ErrorMessage;
