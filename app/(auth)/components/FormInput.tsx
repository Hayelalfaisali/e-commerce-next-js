interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
}

export default function FormInput({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  icon,
  rightElement,
  className = ""
}: FormInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} ${rightElement ? 'pr-12' : 'pr-3'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          placeholder={placeholder}
          disabled={disabled}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
