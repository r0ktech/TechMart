import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.variantKey === action.payload.variantKey,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id &&
            item.variantKey === action.payload.variantKey
              ? {
                  ...item,
                  quantity: item.quantity + (action.payload.quantity || 1),
                }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity || 1 },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.variantKey === action.payload.variantKey
            ),
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id &&
          item.variantKey === action.payload.variantKey
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item,
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "APPLY_COUPON":
      return { ...state, coupon: action.payload };
    case "REMOVE_COUPON":
      return { ...state, coupon: null };
    default:
      return state;
  }
};

const getInitialState = () => {
  try {
    const saved = localStorage.getItem("techmart_cart");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    /* ignore */
  }
  return { items: [], coupon: null };
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  useEffect(() => {
    localStorage.setItem("techmart_cart", JSON.stringify(state));
  }, [state]);

  const addItem = (product, selectedVariants = {}) => {
    const variantKey = Object.values(selectedVariants).join("-") || "default";
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        image: product.images?.[0],
        variantKey,
        variants: selectedVariants,
        quantity: 1,
      },
    });
  };

  const removeItem = (id, variantKey = "default") =>
    dispatch({ type: "REMOVE_ITEM", payload: { id, variantKey } });
  const updateQuantity = (id, variantKey, quantity) =>
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, variantKey, quantity },
    });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const applyCoupon = (coupon) =>
    dispatch({ type: "APPLY_COUPON", payload: coupon });
  const removeCoupon = () => dispatch({ type: "REMOVE_COUPON" });

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = state.coupon ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 500000 ? 0 : subtotal > 100000 ? 3500 : 5000;
  const total = subtotal - discount + delivery;

  const isInCart = (id) => state.items.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        coupon: state.coupon,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        cartCount,
        subtotal,
        discount,
        delivery,
        total,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
