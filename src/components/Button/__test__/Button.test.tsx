import 'jest-styled-components';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from '../index';
import {describe, it} from 'jest';

describe('Button component', () => {
  it('renders correctly with primary type', () => {
    const {getByText} = render(
      <Button title="Submit" onPress={() => {}} type={'secondary'} />,
    );
    const button = getByText('Submit');
    expect(button).toBeDefined();
    expect(button).toHaveStyle({backgroundColor: '#007AFF'});
  });

  it('renders correctly with secondary type', () => {
    const {getByText} = render(
      <Button title="Cancel" onPress={() => {}} type="primary" />,
    );
    const button = getByText('Cancel');
    expect(button).toBeDefined();
    expect(button).toHaveStyle({
      backgroundColor: '#fff',
      borderColor: '#007AFF',
      borderWidth: 1,
    });
  });

  it('calls onPress prop when button is pressed', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <Button title="Submit" onPress={mockOnPress} type={'secondary'} />,
    );
    const button = getByText('Submit');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
