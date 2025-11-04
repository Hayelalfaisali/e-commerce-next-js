interface AlertMessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
  className?: string;
}

export default function AlertMessage({ type, message, className = "" }: AlertMessageProps) {
  const getAlertStyles = () => {
    switch (type) {
      case 'error':
        return {
          container: 'bg-red-50 border border-red-200',
          icon: 'text-red-400',
          text: 'text-red-800',
          iconPath: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'success':
        return {
          container: 'bg-green-50 border border-green-200',
          icon: 'text-green-400',
          text: 'text-green-800',
          iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'info':
        return {
          container: 'bg-blue-50 border border-blue-200',
          icon: 'text-blue-400',
          text: 'text-blue-800',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      default:
        return {
          container: 'bg-gray-50 border border-gray-200',
          icon: 'text-gray-400',
          text: 'text-gray-800',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`${styles.container} rounded-lg p-4 ${className}`}>
      <div className="flex">
        <svg className={`h-5 w-5 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.iconPath} />
        </svg>
        <div className="ml-3">
          <p className={`text-sm ${styles.text}`}>{message}</p>
        </div>
      </div>
    </div>
  );
}
