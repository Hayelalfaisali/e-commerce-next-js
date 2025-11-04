interface AuthFormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthFormContainer({ children, className = "" }: AuthFormContainerProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${className}`}>
      {children}
    </div>
  );
}
