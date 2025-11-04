import { AuthFormState } from './useAuthForm';

export interface ValidationRules {
  required?: string[];
  email?: boolean;
  passwordMatch?: boolean;
  minPasswordLength?: number;
  acceptTerms?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export function useFormValidation() {
  const validateForm = (
    formData: AuthFormState, 
    rules: ValidationRules,
    acceptTerms?: boolean
  ): ValidationResult => {
    // Check required fields
    if (rules.required) {
      for (const field of rules.required) {
        const value = formData[field as keyof AuthFormState];
        if (!value || value.toString().trim() === '') {
          return {
            isValid: false,
            error: `Please fill in all required fields`
          };
        }
      }
    }

    // Email validation
    if (rules.email && formData.email) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(formData.email)) {
        return {
          isValid: false,
          error: 'Please enter a valid email address'
        };
      }
    }

    // Password length validation
    if (rules.minPasswordLength && formData.password) {
      if (formData.password.length < rules.minPasswordLength) {
        return {
          isValid: false,
          error: `Password must be at least ${rules.minPasswordLength} characters long`
        };
      }
    }

    // Password match validation
    if (rules.passwordMatch && formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        return {
          isValid: false,
          error: 'Passwords do not match'
        };
      }
    }

    // Terms acceptance validation
    if (rules.acceptTerms && !acceptTerms) {
      return {
        isValid: false,
        error: 'Please accept the terms and conditions'
      };
    }

    return {
      isValid: true,
      error: ''
    };
  };

  const validateEmail = (email: string): ValidationResult => {
    if (!email) {
      return {
        isValid: false,
        error: 'Please enter your email address'
      };
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        error: 'Please enter a valid email address'
      };
    }

    return {
      isValid: true,
      error: ''
    };
  };

  return {
    validateForm,
    validateEmail
  };
}
