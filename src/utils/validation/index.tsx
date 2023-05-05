interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  password?: boolean;
}

const checkValidity = (value: string, rules: ValidationRules): string => {
  let error = '';

  if (rules.required && !value.trim()) {
    error = 'This field is required';
  }

  if (rules.minLength && value.trim().length < rules.minLength) {
    error = `Minimum ${rules.minLength} characters required`;
  }

  if (rules.maxLength && value.trim().length > rules.maxLength) {
    error = `Maximum ${rules.maxLength} characters allowed`;
  }

  if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = 'Invalid email address';
  }

  if (rules.password) {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!passwordRegex.test(value)) {
      error =
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one symbol';
    }
  }

  return error;
};

export default checkValidity;
