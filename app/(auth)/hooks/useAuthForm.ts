import { useState } from 'react';

export interface AuthFormState {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
}

export interface AuthFormActions {
  formData: AuthFormState;
  setFormData: React.Dispatch<React.SetStateAction<AuthFormState>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  success: string;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}

interface UseAuthFormOptions {
  initialState?: Partial<AuthFormState>;
}

export function useAuthForm(options: UseAuthFormOptions = {}): AuthFormActions {
  const initialFormState: AuthFormState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    ...options.initialState
  };

  const [formData, setFormData] = useState<AuthFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setError('');
    setSuccess('');
    setIsLoading(false);
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
    isLoading,
    setIsLoading,
    error,
    setError,
    success,
    setSuccess
  };
}
