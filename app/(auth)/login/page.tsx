'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, DEMO_CREDENTIALS } from '@/app/contexts/AuthContext';
import { useAuthForm, usePasswordVisibility, useFormValidation } from '../hooks';
import { 
    AuthHeader, 
    FormInput, 
    PasswordInput, 
    AlertMessage, 
    SubmitButton, 
    DemoCredentials, 
    AuthFormContainer 
} from '../components';

export default function Login() {
    const { login, isLoading } = useAuth();
    const router = useRouter();
    const { formData, handleChange, error, setError, success, setSuccess } = useAuthForm();
    const { showPassword, togglePassword } = usePasswordVisibility();
    const { validateForm } = useFormValidation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validation = validateForm(formData, {
            required: ['email', 'password'],
            email: true
        });

        if (!validation.isValid) {
            setError(validation.error);
            return;
        }

        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            setSuccess(result.message);
            console.log('Login successful, redirecting to dashboard...');
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } else {
            setError(result.message);
        }
    };

    const fillDemoCredentials = (type: 'customer' | 'admin') => {
        const credentials = DEMO_CREDENTIALS[type];
        handleChange({ target: { name: 'email', value: credentials.email } } as React.ChangeEvent<HTMLInputElement>);
        handleChange({ target: { name: 'password', value: credentials.password } } as React.ChangeEvent<HTMLInputElement>);
        setError('');
        setSuccess('');
    };

    const loginIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    const emailIcon = (
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
    );

    return (
        <div className="w-full max-w-md mx-auto">
            <AuthHeader
                title="Welcome Back"
                subtitle="Sign in to your ShopHub account"
                iconColor="bg-linear-to-r from-blue-600 to-purple-600"
                icon={loginIcon}
            />

            <DemoCredentials onFillCredentials={fillDemoCredentials} />

            <AuthFormContainer>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        label="Email Address"
                        disabled={isLoading}
                        icon={emailIcon}
                    />

                    <PasswordInput
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        label="Password"
                        showPassword={showPassword}
                        onToggleVisibility={togglePassword}
                        disabled={isLoading}
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <Link
                            href="/forget-password"
                            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {error && <AlertMessage type="error" message={error} />}
                    {success && <AlertMessage type="success" message={success} />}

                    <SubmitButton
                        isLoading={isLoading}
                        loadingText="Signing in..."
                        buttonText="Sign In"
                        className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500"
                    />
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </AuthFormContainer>
        </div>
    );
}