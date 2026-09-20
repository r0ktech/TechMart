export const orders = [
  {
    id: 'TM-284739',
    date: '2024-12-15',
    status: 'delivered',
    statusHistory: [
      { status: 'Order Placed', date: '2024-12-15 09:30', completed: true },
      { status: 'Payment Confirmed', date: '2024-12-15 09:31', completed: true },
      { status: 'Processing', date: '2024-12-15 14:00', completed: true },
      { status: 'Shipped', date: '2024-12-16 08:00', completed: true },
      { status: 'Out for Delivery', date: '2024-12-18 07:30', completed: true },
      { status: 'Delivered', date: '2024-12-18 14:22', completed: true }
    ],
    items: [
      { productId: 'lp-001', name: 'MacBook Air M2', price: 1350000, quantity: 1, variant: '8GB / 256GB / Midnight' },
      { productId: 'ms-001', name: 'Logitech MX Master 3S', price: 145000, quantity: 1, variant: 'Graphite' }
    ],
    subtotal: 1495000,
    delivery: 5000,
    discount: 0,
    total: 1500000,
    address: '15 Admiralty Way, Lekki Phase 1, Lagos',
    paymentMethod: 'Card',
    estimatedDelivery: '2024-12-18'
  },
  {
    id: 'TM-391047',
    date: '2024-12-20',
    status: 'shipped',
    statusHistory: [
      { status: 'Order Placed', date: '2024-12-20 16:45', completed: true },
      { status: 'Payment Confirmed', date: '2024-12-20 16:46', completed: true },
      { status: 'Processing', date: '2024-12-21 10:00', completed: true },
      { status: 'Shipped', date: '2024-12-22 09:15', completed: true },
      { status: 'Out for Delivery', date: null, completed: false },
      { status: 'Delivered', date: null, completed: false }
    ],
    items: [
      { productId: 'ph-001', name: 'iPhone 15', price: 1050000, quantity: 1, variant: '128GB / Blue' },
      { productId: 'hp-001', name: 'Apple AirPods Pro (2nd Gen)', price: 185000, quantity: 1, variant: null }
    ],
    subtotal: 1235000,
    delivery: 3500,
    discount: 50000,
    total: 1188500,
    address: '42 Adeola Odeku St, Victoria Island, Lagos',
    paymentMethod: 'Bank Transfer',
    estimatedDelivery: '2024-12-25'
  },
  {
    id: 'TM-502813',
    date: '2024-12-22',
    status: 'processing',
    statusHistory: [
      { status: 'Order Placed', date: '2024-12-22 11:20', completed: true },
      { status: 'Payment Confirmed', date: '2024-12-22 11:21', completed: true },
      { status: 'Processing', date: '2024-12-22 15:00', completed: true },
      { status: 'Shipped', date: null, completed: false },
      { status: 'Out for Delivery', date: null, completed: false },
      { status: 'Delivered', date: null, completed: false }
    ],
    items: [
      { productId: 'st-001', name: 'Kingston NV2 1TB NVMe SSD', price: 75000, quantity: 2, variant: '1TB' }
    ],
    subtotal: 150000,
    delivery: 2500,
    discount: 0,
    total: 152500,
    address: '8 Wuse Zone 5, Abuja FCT',
    paymentMethod: 'Cash on Delivery',
    estimatedDelivery: '2024-12-27'
  }
];

export const getOrderById = (id) => orders.find(o => o.id === id);
