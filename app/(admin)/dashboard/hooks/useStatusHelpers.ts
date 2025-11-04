export interface StatusConfig {
  label: string;
  color: string;
}

export interface StatusHelpers {
  getStatusConfig: (status: string) => StatusConfig;
  getOrderStatusConfig: (status: string) => StatusConfig;
  getUserStatusConfig: (status: string) => StatusConfig;
  getUserRoleConfig: (role: string) => StatusConfig;
  getStockStatusConfig: (stockCount: number, inStock: boolean) => StatusConfig;
}

export function useStatusHelpers(): StatusHelpers {
  const getStatusConfig = (status: string): StatusConfig => {
    switch (status.toLowerCase()) {
      case 'active':
        return { label: 'Active', color: 'bg-green-100 text-green-800' };
      case 'inactive':
        return { label: 'Inactive', color: 'bg-gray-100 text-gray-800' };
      case 'pending':
        return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
      case 'completed':
        return { label: 'Completed', color: 'bg-green-100 text-green-800' };
      case 'cancelled':
        return { label: 'Cancelled', color: 'bg-red-100 text-red-800' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getOrderStatusConfig = (status: string): StatusConfig => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
      case 'processing':
        return { label: 'Processing', color: 'bg-blue-100 text-blue-800' };
      case 'shipped':
        return { label: 'Shipped', color: 'bg-green-100 text-green-800' };
      case 'delivered':
        return { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800' };
      case 'cancelled':
        return { label: 'Cancelled', color: 'bg-red-100 text-red-800' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getUserStatusConfig = (status: string): StatusConfig => {
    switch (status.toLowerCase()) {
      case 'active':
        return { label: 'Active', color: 'bg-green-100 text-green-800' };
      case 'inactive':
        return { label: 'Inactive', color: 'bg-gray-100 text-gray-800' };
      case 'suspended':
        return { label: 'Suspended', color: 'bg-red-100 text-red-800' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getUserRoleConfig = (role: string): StatusConfig => {
    switch (role.toLowerCase()) {
      case 'admin':
        return { label: 'Admin', color: 'bg-purple-100 text-purple-800' };
      case 'customer':
        return { label: 'Customer', color: 'bg-blue-100 text-blue-800' };
      default:
        return { label: role, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getStockStatusConfig = (stockCount: number, inStock: boolean): StatusConfig => {
    if (!inStock || stockCount === 0) {
      return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    }
    if (stockCount < 10) {
      return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return {
    getStatusConfig,
    getOrderStatusConfig,
    getUserStatusConfig,
    getUserRoleConfig,
    getStockStatusConfig
  };
}
