interface UserAvatarProps {
  name: string;
  email?: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export default function UserAvatar({ 
  name, 
  email, 
  avatar, 
  size = 'md', 
  showDetails = true 
}: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-sm'
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} bg-gray-200 rounded-full flex items-center justify-center shrink-0`}>
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className={`${sizeClasses[size]} rounded-full object-cover`}
          />
        ) : (
          <span className="font-medium text-gray-600">
            {getInitials(name)}
          </span>
        )}
      </div>
      {showDetails && (
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{name}</p>
          {email && (
            <p className="text-sm text-gray-500 truncate">{email}</p>
          )}
        </div>
      )}
    </div>
  );
}
