interface AuthHeaderProps {
  title: string;
  subtitle: string;
  iconColor: string;
  icon: React.ReactNode;
}

export default function AuthHeader({ title, subtitle, iconColor, icon }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex items-center justify-center w-16 h-16 ${iconColor} rounded-full mb-4`}>
        {icon}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
}
