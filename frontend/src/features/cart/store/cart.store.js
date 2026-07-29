import create from "zustand";

const useCartStore = create((set) => ({
  items: [],
  businessId: null,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getSubtotal: () => 0,
  getTotalItems: () => 0,
}));

export default useCartStore;
