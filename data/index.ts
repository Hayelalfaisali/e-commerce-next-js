// Data exports for easy importing
import products from './products.json';
import users from './users.json';
import orders from './orders.json';
import gallery from './gallery.json';
import help from './help.json';
import analytics from './analytics.json';
import cart from './cart.json';

// Type definitions
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  features: string[];
  variants: {
    colors: string[];
    sizes: string[];
  };
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'customer' | 'admin';
  isActive: boolean;
  joinDate: string;
  lastLogin: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    theme: 'light' | 'dark';
  };
  stats: {
    totalOrders: number;
    totalSpent: number;
    favoriteCategory: string | null;
  };
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate: string | null;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  items: OrderItem[];
  trackingNumber: string | null;
  notes: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  src: string;
  category: string;
  tags: string[];
  photographer: string;
  location: string;
  uploadDate: string;
  likes: number;
  views: number;
}

export interface HelpTopic {
  title: string;
  description: string;
  content: string;
  sections?: Array<{
    title: string;
    content: string;
  }>;
  subsections?: Record<string, HelpTopic>;
  [key: string]: any;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  originalPrice: number;
  quantity: number;
  selectedVariants: {
    color: string | null;
    size: string | null;
  };
  image: string;
  inStock: boolean;
  maxQuantity: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId: string | null;
  items: CartItem[];
  summary: {
    subtotal: number;
    originalSubtotal: number;
    savings: number;
    tax: number;
    shipping: number;
    total: number;
    itemCount: number;
  };
  shippingOptions: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDays: string;
  }>;
  selectedShipping: string | null;
  promoCode: string | null;
  appliedDiscount: any;
  lastUpdated: string | null;
}

// Export data
export {
  products,
  users,
  orders,
  gallery,
  help,
  analytics,
  cart
};

// Helper functions for data manipulation
export const getProductById = (id: string): Product | undefined => {
  return (products.products as Product[]).find((product: Product) => product.id === id);
};

export const getAllProducts = (): Product[] => {
  return products.products as Product[];
};

export const getProductsByCategory = (category: string): Product[] => {
  return (products.products as Product[]).filter((product: Product) => product.category === category);
};

export const getUserById = (id: string): User | undefined => {
  return (users.users as User[]).find((user: User) => user.id === id);
};

export const getOrderById = (id: string): Order | undefined => {
  return (orders.orders as Order[]).find((order: Order) => order.id === id);
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return (orders.orders as Order[]).filter((order: Order) => order.userId === userId);
};

export const getImageById = (id: string): GalleryImage | undefined => {
  return (gallery.images as GalleryImage[]).find((image: GalleryImage) => image.id === id);
};

export const getImagesByCategory = (category: string): GalleryImage[] => {
  return (gallery.images as GalleryImage[]).filter((image: GalleryImage) => image.category === category);
};

export const getHelpTopic = (topicPath: string): HelpTopic | null => {
  const topics = topicPath.split('/');
  let current: any = help.helpTopics;
  
  for (const topic of topics) {
    if (current[topic]) {
      current = current[topic];
    } else if (current.subsections && current.subsections[topic]) {
      current = current.subsections[topic];
    } else {
      return null;
    }
  }
  
  return current as HelpTopic;
};

// Mock API delay function
export const delay = (ms: number = 1000): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Sample data generators
export const generateSampleCart = (userId: string = "1"): Cart => {
  return {
    ...cart.sampleCart,
    userId,
    id: `cart-user-${userId}`
  } as Cart;
};

export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};
