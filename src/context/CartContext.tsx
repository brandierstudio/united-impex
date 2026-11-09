import React, { createContext, useContext, useState, useEffect } from 'react';
import { CONTACT_INFO } from '../data/businessData';
import { ECOMMERCE_PRODUCTS } from '../data/ecommerceProductsData';
import { trackAddToCart } from '../utils/analytics';

export interface CartItem {
  id: string; // unique composite key: `${productId}-${variantId}`
  productId: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  variantId: string;
  variantName: string;
  unitPricePKR: number;
  priceUnit: string;
  quantity: number;
  minOrderQuantity: number;
  material?: string;
  finish?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalUnitsCount: number;
  subtotalPKR: number;
  formatWhatsAppQuoteUrl: (customerName?: string, customerNote?: string) => string;
  
  // Real Client-Side Wishlist (No fake hearts)
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ui_ecommerce_cart_v1';
const WISHLIST_STORAGE_KEY = 'ui_ecommerce_wishlist_v1';

// Initial Demo Packaging Items matching 04_cart_quote_experience.png reference
const INITIAL_DEMO_ITEMS: CartItem[] = [
  {
    id: 'prod-cups-var-cup-8oz',
    productId: 'prod-cups',
    slug: 'coffee-cups',
    title: 'Custom Printed Paper Cups (Hot & Cold)',
    category: 'Paper Cups',
    image: ECOMMERCE_PRODUCTS[0]?.primaryImage || '',
    variantId: 'var-cup-8oz',
    variantName: '8 oz Double Wall Cup (240ml)',
    unitPricePKR: 8.50,
    priceUnit: 'cup',
    quantity: 5000,
    minOrderQuantity: 1000,
    material: 'Double Wall PE-Coated Food Grade Paperboard',
    finish: 'Smooth Matte CMYK'
  },
  {
    id: 'prod-bags-var-bag-med',
    productId: 'prod-bags',
    slug: 'paper-bags',
    title: 'Twisted Handle Kraft Shopping Bags',
    category: 'Paper Bags',
    image: ECOMMERCE_PRODUCTS[2]?.primaryImage || '',
    variantId: 'var-bag-med',
    variantName: 'Medium 10 x 8 x 4 in',
    unitPricePKR: 28.00,
    priceUnit: 'bag',
    quantity: 2000,
    minOrderQuantity: 500,
    material: '150 GSM Virgin Brown Kraft',
    finish: 'Natural Matte with Twisted Paper Cord Handles'
  }
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage (falls back to INITIAL_DEMO_ITEMS on pristine load)
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return INITIAL_DEMO_ITEMS;
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return INITIAL_DEMO_ITEMS;
      const parsed: CartItem[] = JSON.parse(stored);
      return parsed.map(item => {
        if (item.productId === 'prod-cups' && (!item.image || item.image.startsWith('/src/assets/'))) {
          return { ...item, image: ECOMMERCE_PRODUCTS[0]?.primaryImage || '' };
        }
        if (item.productId === 'prod-bags' && (!item.image || item.image.startsWith('/src/assets/'))) {
          return { ...item, image: ECOMMERCE_PRODUCTS[2]?.primaryImage || '' };
        }
        return item;
      });
    } catch {
      return INITIAL_DEMO_ITEMS;
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 2. Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Unable to persist cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Unable to persist wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // 3. Cart Actions
  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    trackAddToCart(newItem.productId, newItem.title, newItem.quantity, newItem.unitPricePKR);
    const compositeId = `${newItem.productId}-${newItem.variantId}`;
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === compositeId);
      if (existingIndex > -1) {
        // Increment quantity if same product & variant
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity
        };
        return updated;
      } else {
        // Add as new item row
        return [...prevItems, { ...newItem, id: compositeId }];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  // 4. Calculations
  const totalItemsCount = items.length;
  const totalUnitsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalPKR = items.reduce(
    (sum, item) => sum + item.unitPricePKR * item.quantity,
    0
  );

  // 5. Real Client-Side Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  // 6. WhatsApp Quotation URL Builder (No fake checkout)
  const formatWhatsAppQuoteUrl = (customerName = '', customerNote = ''): string => {
    const phone = CONTACT_INFO.whatsappNumber.replace(/[^0-9]/g, '');
    
    let message = `*UNITED IMPEX — CART QUOTATION INQUIRY*\n`;
    message += `Date: ${new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}\n\n`;
    
    if (customerName.trim()) {
      message += `Client: ${customerName.trim()}\n`;
    }
    
    message += `*Selected Packaging Items (${items.length} product${items.length > 1 ? 's' : ''}):*\n`;
    
    items.forEach((item, index) => {
      const lineTotal = (item.unitPricePKR * item.quantity).toLocaleString();
      message += `\n${index + 1}. *${item.title}*\n`;
      message += `   • Specification: ${item.variantName}\n`;
      message += `   • Quantity: ${item.quantity.toLocaleString()} ${item.priceUnit}s\n`;
      message += `   • Est. Rate: PKR ${item.unitPricePKR.toFixed(2)} / ${item.priceUnit}\n`;
      message += `   • Line Est: PKR ${lineTotal}\n`;
    });
    
    message += `\n---------------------------------\n`;
    message += `*Illustrative Estimate: PKR ${subtotalPKR.toLocaleString()}*\n`;
    message += `_(Note: Demo pricing baseline. Final formal quotation depends on exact dielines, paperboard market rates, and volume)._\n`;
    
    if (customerNote.trim()) {
      message += `\nClient Notes: "${customerNote.trim()}"\n`;
    }
    
    message += `\nPlease review these specifications and provide an official itemized quotation and dieline templates.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        totalUnitsCount,
        subtotalPKR,
        formatWhatsAppQuoteUrl,
        wishlistIds,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
