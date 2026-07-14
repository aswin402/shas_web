import { create } from 'zustand';
import type { Product, CartItem, ShippingDetails } from '@/types/jewelry';

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  
  // Customizer State
  customJewel: {
    baseId: string;
    metal: string;
    gem: string;
    price: number;
  };
  
  // Checkout & Drawer State
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  checkoutStep: number;
  shippingInfo: ShippingDetails;
  courierType: 'standard' | 'white-glove';

  // Actions
  toggleCart: (isOpen?: boolean) => void;
  toggleCheckout: (isOpen?: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  
  setCustomMetal: (metal: string) => void;
  setCustomGem: (gem: string) => void;
  resetCustomizer: () => void;
  
  setCheckoutStep: (step: number) => void;
  setShippingInfo: (info: Partial<ShippingDetails>) => void;
  setCourierType: (type: 'standard' | 'white-glove') => void;
}

const DEFAULT_SHIPPING: ShippingDetails = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  phone: '',
};

export const useAppStore = create<AppState>((set) => ({
  cart: [],
  wishlist: [],
  
  customJewel: {
    baseId: 'custom-1',
    metal: '18K Rose Gold',
    gem: 'Zambian Emerald',
    price: 3550, // Base 2150 + Rose Gold 200 + Emerald 1200
  },
  
  isCartOpen: false,
  isCheckoutOpen: false,
  checkoutStep: 1,
  shippingInfo: DEFAULT_SHIPPING,
  courierType: 'standard',

  toggleCart: (isOpen) => set((state) => ({ 
    isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen 
  })),

  toggleCheckout: (isOpen) => set((state) => ({ 
    isCheckoutOpen: isOpen !== undefined ? isOpen : !state.isCheckoutOpen,
    checkoutStep: 1,
    shippingInfo: isOpen ? state.shippingInfo : DEFAULT_SHIPPING,
    courierType: 'standard'
  })),

  addToCart: (product, quantity = 1) => set((state) => {
    const existing = state.cart.find((item) => item.product.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    }
    return { cart: [...state.cart, { product, quantity }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.product.id !== productId),
  })),

  updateQty: (productId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ),
  })),

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlist.some((item) => item.id === product.id);
    if (exists) {
      return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
    }
    return { wishlist: [...state.wishlist, product] };
  }),

  setCustomMetal: (metal) => set((state) => {
    let metalPrice = 200; // 18k Rose Gold
    if (metal === '22K Yellow Gold') metalPrice = 400;
    if (metal === 'Platinum') metalPrice = 800;

    let gemPrice = 1200; // Emerald
    if (state.customJewel.gem === 'Uncut Diamond (Polki)') gemPrice = 1500;
    if (state.customJewel.gem === 'Burmese Ruby') gemPrice = 1000;
    if (state.customJewel.gem === 'Baroque Pearl') gemPrice = 300;
    if (state.customJewel.gem === 'None') gemPrice = 0;

    return {
      customJewel: {
        ...state.customJewel,
        metal,
        price: 2150 + metalPrice + gemPrice,
      },
    };
  }),

  setCustomGem: (gem) => set((state) => {
    let metalPrice = 200;
    if (state.customJewel.metal === '22K Yellow Gold') metalPrice = 400;
    if (state.customJewel.metal === 'Platinum') metalPrice = 800;

    let gemPrice = 1200;
    if (gem === 'Uncut Diamond (Polki)') gemPrice = 1500;
    if (gem === 'Burmese Ruby') gemPrice = 1000;
    if (gem === 'Baroque Pearl') gemPrice = 300;
    if (gem === 'None') gemPrice = 0;

    return {
      customJewel: {
        ...state.customJewel,
        gem,
        price: 2150 + metalPrice + gemPrice,
      },
    };
  }),

  resetCustomizer: () => set({
    customJewel: {
      baseId: 'custom-1',
      metal: '18K Rose Gold',
      gem: 'Zambian Emerald',
      price: 3550,
    },
  }),

  setCheckoutStep: (step) => set({ checkoutStep: step }),
  
  setShippingInfo: (info) => set((state) => ({
    shippingInfo: { ...state.shippingInfo, ...info }
  })),

  setCourierType: (courierType) => set({ courierType }),
}));
