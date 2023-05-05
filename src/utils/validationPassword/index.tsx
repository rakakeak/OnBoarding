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

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
