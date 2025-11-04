'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthForm, useFormValidation } from '../hooks';
import { 
    AuthHeader, 
    FormInput, 
    AlertMessage, 
    SubmitButton, 
    AuthFormContainer 
} from '../components';

export default function ForgetPassword() {
    const [emailSent, setEmailSent] = useState(false);
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
    const { validateEmail } = useFormValidation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validation = validateEmail(formData.email);
        if (!validation.isValid) {
            setError(validation.error);
            return;
        }

        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real app, you would send this to your API
        setSuccess('Password reset instructions have been sent to your email address.');
        setEmailSent(true);
        
        setIsLoading(false);
    };

    const handleResendEmail = async () => {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSuccess('Password reset email has been resent.');
        setIsLoading(false);
    };

    const forgotPasswordIcon = (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
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
                title={emailSent ? 'Check Your Email' : 'Forgot Password?'}
                subtitle={emailSent 
                    ? 'We\'ve sent password reset instructions to your email address.'
                    : 'No worries! Enter your email and we\'ll send you reset instructions.'
                }
                iconColor="bg-linear-to-r from-orange-600 to-red-600"
                icon={forgotPasswordIcon}
            />

            <AuthFormContainer>
                {!emailSent ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            label="Email Address"
                            disabled={isLoading}
                            icon={emailIcon}
                        />

                        {error && <AlertMessage type="error" message={error} />}

                        <SubmitButton
                            isLoading={isLoading}
                            loadingText="Sending Instructions..."
                            buttonText="Send Reset Instructions"
                            className="bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:ring-orange-500"
                        />
                    </form>
                ) : (
                    <div className="space-y-6">
                        {success && <AlertMessage type="success" message={success} />}

                        {/* Instructions */}
                        <div className="text-center space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">What's next?</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Check your email inbox</li>
                                    <li>• Look for an email from ShopHub</li>
                                    <li>• Click the reset link in the email</li>
                                    <li>• Create your new password</li>
                                </ul>
                            </div>

                            <p className="text-sm text-gray-600">
                                Didn't receive the email? Check your spam folder or{' '}
                                <button
                                    onClick={handleResendEmail}
                                    disabled={isLoading}
                                    className="text-orange-600 hover:text-orange-500 font-medium disabled:opacity-50"
                                >
                                    {isLoading ? 'Resending...' : 'resend it'}
                                </button>
                            </p>
                        </div>
                    </div>
                )}

                {/* Back to Login */}
                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-500"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Sign In
                    </Link>
                </div>
            </AuthFormContainer>
        </div>
    );
}