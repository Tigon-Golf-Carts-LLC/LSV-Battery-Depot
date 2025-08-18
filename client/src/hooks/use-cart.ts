import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  isOpen: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  setItemCount: (count: number) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      isOpen: false,
      itemCount: 0,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setItemCount: (count) => set({ itemCount: count }),
    }),
    {
      name: 'tigon-cart-storage',
    }
  )
);
