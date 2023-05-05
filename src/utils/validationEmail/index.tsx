export const validateEmail = (value: string) => {
  // Regular expression to check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    return {
      isValid: false,
      errorMsg: 'Email is required',
    };
  }

  if (!emailRegex.test(value)) {
    return {
      isValid: false,
      errorMsg: 'Invalid email format',
    };
  }

  return {
    isValid: true,
  };
};

export const validatePassword = (password: string) => {
  let errorMessage = '';

  if (password.length < 8) {
    errorMessage = 'Password must contain at least 8 characters';
  } else if (!/[a-z]/.test(password)) {
    errorMessage = 'Password must contain at least a lowercase letter';
  } else if (!/[A-Z]/.test(password)) {
    errorMessage = 'Password must contain at least an uppercase letter';
  } else if (!/\d/.test(password) && !/[^\w\s]/.test(password)) {
    errorMessage = 'Password must contain at least a symbol';
  }

  return errorMessage;
};
