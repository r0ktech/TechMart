export const brands = [
  { id: 'apple', name: 'Apple', slug: 'apple', color: '#A3AAAE' },
  { id: 'samsung', name: 'Samsung', slug: 'samsung', color: '#1428A0' },
  { id: 'dell', name: 'Dell', slug: 'dell', color: '#007DB8' },
  { id: 'hp', name: 'HP', slug: 'hp', color: '#0096D6' },
  { id: 'lenovo', name: 'Lenovo', slug: 'lenovo', color: '#E2231A' },
  { id: 'asus', name: 'ASUS', slug: 'asus', color: '#00539B' },
  { id: 'acer', name: 'Acer', slug: 'acer', color: '#83B81A' },
  { id: 'microsoft', name: 'Microsoft', slug: 'microsoft', color: '#F25022' },
  { id: 'logitech', name: 'Logitech', slug: 'logitech', color: '#00B8FC' },
  { id: 'sony', name: 'Sony', slug: 'sony', color: '#000000' },
  { id: 'anker', name: 'Anker', slug: 'anker', color: '#00AEEF' },
  { id: 'kingston', name: 'Kingston', slug: 'kingston', color: '#E31937' },
  { id: 'razer', name: 'Razer', slug: 'razer', color: '#44D62C' },
  { id: 'corsair', name: 'Corsair', slug: 'corsair', color: '#F8E400' },
  { id: 'google', name: 'Google', slug: 'google', color: '#4285F4' },
  { id: 'nvidia', name: 'NVIDIA', slug: 'nvidia', color: '#76B900' },
  { id: 'amd', name: 'AMD', slug: 'amd', color: '#ED1C24' }
];

export const getBrandBySlug = (slug) => brands.find(b => b.slug === slug);
