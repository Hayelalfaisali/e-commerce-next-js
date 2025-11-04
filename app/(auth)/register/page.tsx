'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthForm, usePasswordVisibility, useFormValidation } from '../hooks';
import { 
    AuthHeader, 
    FormInput, 
    PasswordInput, 
    AlertMessage, 
    SubmitButton, 
    AuthFormContainer 
} from '../components';

export default function Register() {
    const router = useRouter();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const { 
        formData, 
        handleChange, 
        error, 
        setError, 
        success, 
        setSuccess, 
        isLoading, 
        setIsLoading 
    } = useAuthForm();
    const { showPassword, showConfirmPassword, togglePassword, toggleConfirmPassword } = usePasswordVisibility();
    const { validateForm } = useFormValidation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validation = validateForm(formData, {
            required: ['firstName', 'lastName', 'email', 'password', 'confirmPassword'],
            email: true,
            passwordMatch: true,
            minPasswordLength: 6,
            acceptTerms: true
        }, acceptTerms);

        if (!validation.isValid) {
            setError(validation.error);
            return;
        }

        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real app, you would send this to your API
        setSuccess('Account created successfully! Redirecting to login...');
        
        setTimeout(() => {
            router.push('/login');
        }, 2000);
        
        setIsLoading(false);
    };

    const registerIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
                title="Create Account"
                subtitle="Join ShopHub and start shopping"
                iconColor="bg-linear-to-r from-green-600 to-blue-600"
                icon={registerIcon}
            />

            <AuthFormContainer>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                            placeholder="John"
                            label="First Name"
                            disabled={isLoading}
                        />
                        <FormInput
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                            placeholder="Doe"
                            label="Last Name"
                            disabled={isLoading}
                        />
                    </div>

                    <FormInput
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        label="Email Address"
                        disabled={isLoading}
                        icon={emailIcon}
                    />

                    <PasswordInput
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        label="Password"
                        showPassword={showPassword}
                        onToggleVisibility={togglePassword}
                        disabled={isLoading}
                    />

                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword || ''}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        label="Confirm Password"
                        showPassword={showConfirmPassword}
                        onToggleVisibility={toggleConfirmPassword}
                        disabled={isLoading}
                    />

                    {/* Terms and Conditions */}
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="text-gray-700">
                                I agree to the{' '}
                                <Link href="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                                    Terms and Conditions
                                </Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                    </div>

                    {error && <AlertMessage type="error" message={error} />}
                    {success && <AlertMessage type="success" message={success} />}

                    <SubmitButton
                        isLoading={isLoading}
                        loadingText="Creating Account..."
                        buttonText="Create Account"
                        className="bg-linear-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:ring-green-500"
                    />
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </AuthFormContainer>
        </div>
    );
}