interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  className?: string;
}

export default function ActionButtons({ buttons, className = "" }: ActionButtonsProps) {
  const getButtonStyles = (variant: ActionButton['variant'] = 'secondary') => {
    switch (variant) {
      case 'primary':
        return 'text-blue-600 hover:text-blue-800';
      case 'danger':
        return 'text-red-600 hover:text-red-800';
      default:
        return 'text-gray-600 hover:text-gray-800';
    }
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          disabled={button.disabled}
          className={`text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getButtonStyles(button.variant)}`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
