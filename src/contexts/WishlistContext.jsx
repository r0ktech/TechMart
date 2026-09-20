import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('techmart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('techmart_wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    if (!items.find(i => i.id === product.id)) {
      setItems(prev => [...prev, {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviewCount: product.reviewCount,
        image: product.images?.[0],
        stock: product.stock,
        category: product.category
      }]);
    }
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const toggleItem = (product) => isInWishlist(product.id) ? removeItem(product.id) : addItem(product);
  const isInWishlist = (id) => items.some(i => i.id === id);
  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isInWishlist, clearWishlist, wishlistCount: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
