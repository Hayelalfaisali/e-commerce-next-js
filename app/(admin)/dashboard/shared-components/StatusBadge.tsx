interface StatusBadgeProps {
  label: string;
  color: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatusBadge({ label, color, icon, className = "" }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${color} ${className}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </span>
  );
}
