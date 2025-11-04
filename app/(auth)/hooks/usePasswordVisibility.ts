import { useState } from 'react';

export interface PasswordVisibilityState {
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
}

export function usePasswordVisibility(): PasswordVisibilityState {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return {
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword
  };
}
