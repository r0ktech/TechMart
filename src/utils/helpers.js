export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const generateOrderId = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `TM-${num}`;
};

export const calculateDiscount = (original, current) => {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getTimeRemaining = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false
  };
};

export const slugify = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-low': return sorted.sort((a, b) => a.price - b.price);
    case 'price-high': return sorted.sort((a, b) => b.price - a.price);
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest': return sorted.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    case 'discount': return sorted.sort((a, b) => b.discount - a.discount);
    default: return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
};

export const filterProducts = (products, filters) => {
  return products.filter(product => {
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    if (filters.inStock && product.stock <= 0) return false;
    if (filters.onSale && !product.deal && product.discount <= 0) return false;
    return true;
  });
};
