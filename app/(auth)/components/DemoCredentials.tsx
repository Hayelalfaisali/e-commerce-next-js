import { DEMO_CREDENTIALS } from '@/app/contexts/AuthContext';

interface DemoCredentialsProps {
  onFillCredentials: (type: 'customer' | 'admin') => void;
}

export default function DemoCredentials({ onFillCredentials }: DemoCredentialsProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onFillCredentials('customer')}
          className="w-full text-left text-xs bg-white border border-blue-200 rounded px-3 py-2 hover:bg-blue-50 transition-colors"
        >
          <strong>Customer:</strong> {DEMO_CREDENTIALS.customer.email} / {DEMO_CREDENTIALS.customer.password}
        </button>
        <button
          type="button"
          onClick={() => onFillCredentials('admin')}
          className="w-full text-left text-xs bg-white border border-blue-200 rounded px-3 py-2 hover:bg-blue-50 transition-colors"
        >
          <strong>Admin:</strong> {DEMO_CREDENTIALS.admin.email} / {DEMO_CREDENTIALS.admin.password}
        </button>
      </div>
    </div>
  );
}
