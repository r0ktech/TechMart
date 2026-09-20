import { Laptop, Smartphone, Tablet, Monitor, Keyboard, Mouse, Headphones, HardDrive, MemoryStick, Cpu, BatteryCharging, Gamepad2 } from 'lucide-react';

export const categories = [
  { id: 'laptops', name: 'Laptops', slug: 'laptops', icon: 'Laptop', count: 8, description: 'Powerful laptops for work and play', color: '#3B82F6' },
  { id: 'smartphones', name: 'Smartphones', slug: 'smartphones', icon: 'Smartphone', count: 6, description: 'Latest smartphones from top brands', color: '#8B5CF6' },
  { id: 'tablets', name: 'Tablets', slug: 'tablets', icon: 'Tablet', count: 3, description: 'Tablets for creativity and productivity', color: '#EC4899' },
  { id: 'monitors', name: 'Monitors', slug: 'monitors', icon: 'Monitor', count: 3, description: 'High-resolution displays for every need', color: '#14B8A6' },
  { id: 'keyboards', name: 'Keyboards', slug: 'keyboards', icon: 'Keyboard', count: 3, description: 'Mechanical and wireless keyboards', color: '#F97316' },
  { id: 'mice', name: 'Mice', slug: 'mice', icon: 'Mouse', count: 3, description: 'Precision mice for work and gaming', color: '#EF4444' },
  { id: 'headphones', name: 'Headphones', slug: 'headphones', icon: 'Headphones', count: 3, description: 'Premium audio experiences', color: '#6366F1' },
  { id: 'storage', name: 'SSDs & Storage', slug: 'storage', icon: 'HardDrive', count: 3, description: 'Fast NVMe and portable SSDs', color: '#0EA5E9' },
  { id: 'ram', name: 'RAM', slug: 'ram', icon: 'MemoryStick', count: 2, description: 'Desktop and laptop memory', color: '#22C55E' },
  { id: 'graphics-cards', name: 'Graphics Cards', slug: 'graphics-cards', icon: 'Cpu', count: 2, description: 'GPUs for gaming and creative work', color: '#A855F7' },
  { id: 'chargers', name: 'Chargers & Power', slug: 'chargers', icon: 'BatteryCharging', count: 3, description: 'Chargers, power banks, and adapters', color: '#84CC16' },
  { id: 'gaming', name: 'Gaming', slug: 'gaming', icon: 'Gamepad2', count: 3, description: 'Gaming accessories and peripherals', color: '#DC2626' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', icon: 'Laptop', count: 4, description: 'Hubs, stands, webcams, and more', color: '#64748B' }
];

export const getCategoryById = (id) => categories.find(c => c.id === id);
export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug);

export const iconMap = {
  Laptop, Smartphone, Tablet, Monitor, Keyboard, Mouse, Headphones, HardDrive, MemoryStick, Cpu, BatteryCharging, Gamepad2
};
