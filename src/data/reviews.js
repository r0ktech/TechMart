export const reviews = {
  'lp-001': [
    { id: 'r1', user: 'Chinedu O.', rating: 5, date: '2024-11-15', verified: true, text: 'This MacBook Air is amazing! The M2 chip handles everything I throw at it. Battery life is incredible — I can work all day without charging. Perfect for software development.', helpful: 24 },
    { id: 'r2', user: 'Amara E.', rating: 5, date: '2024-10-28', verified: true, text: 'Upgraded from an older MacBook and the difference is night and day. The display is beautiful, the keyboard feels great, and it\'s so light to carry around.', helpful: 18 },
    { id: 'r3', user: 'Tunde A.', rating: 4, date: '2024-10-12', verified: true, text: 'Great laptop overall. My only minor complaint is that 256GB fills up fast if you have lots of projects. Should have gotten the 512GB version.', helpful: 12 },
    { id: 'r4', user: 'Ngozi P.', rating: 5, date: '2024-09-20', verified: true, text: 'Using this for graphic design and video editing. Handles Figma and Final Cut Pro without breaking a sweat. Best purchase I\'ve made this year!', helpful: 31 },
    { id: 'r5', user: 'Ibrahim K.', rating: 4, date: '2024-08-15', verified: false, text: 'Solid laptop. The fanless design means it runs completely silent. Only 2 ports is a limitation but I use a hub. Good value for money.', helpful: 8 }
  ],
  'ph-001': [
    { id: 'r6', user: 'Blessing N.', rating: 5, date: '2024-12-01', verified: true, text: 'Finally upgraded to iPhone 15! The camera quality is insane, especially in low light. Dynamic Island is actually useful now.', helpful: 45 },
    { id: 'r7', user: 'Emeka C.', rating: 4, date: '2024-11-20', verified: true, text: 'Great phone. Love the USB-C switch. Battery easily lasts a full day. The 48MP camera takes stunning photos.', helpful: 22 },
    { id: 'r8', user: 'Fatima S.', rating: 5, date: '2024-11-05', verified: true, text: 'Coming from an Android, iOS is so smooth and polished. The build quality is premium and FaceTime works perfectly for my video calls.', helpful: 16 },
    { id: 'r9', user: 'Olu D.', rating: 3, date: '2024-10-15', verified: true, text: 'Good phone but I expected more innovation for the price. The design hasn\'t changed much from iPhone 14. Camera is excellent though.', helpful: 34 }
  ],
  'ph-003': [
    { id: 'r10', user: 'Adebayo M.', rating: 5, date: '2024-12-10', verified: true, text: 'The Galaxy S24 Ultra is the best Android phone ever! Galaxy AI features are genuinely useful. The 200MP camera takes incredible photos.', helpful: 56 },
    { id: 'r11', user: 'Chioma L.', rating: 5, date: '2024-11-25', verified: true, text: 'S Pen is perfect for note-taking and sketching. The titanium frame feels premium. Battery lasts almost 2 days with moderate use.', helpful: 28 },
    { id: 'r12', user: 'Yusuf B.', rating: 4, date: '2024-11-08', verified: true, text: 'Amazing phone but it\'s quite heavy and the price is steep. Display is the best I\'ve ever seen on a phone. Camera zoom is mind-blowing.', helpful: 19 }
  ],
  'ms-001': [
    { id: 'r13', user: 'Funke A.', rating: 5, date: '2024-11-30', verified: true, text: 'Best mouse I\'ve ever used! The MagSpeed scroll wheel is addictive. Works perfectly between my Mac and Windows machine.', helpful: 37 },
    { id: 'r14', user: 'David O.', rating: 5, date: '2024-10-22', verified: true, text: 'Incredibly comfortable for long work sessions. The thumb wheel is great for horizontal scrolling in spreadsheets. Battery lasts forever.', helpful: 21 },
    { id: 'r15', user: 'Kemi T.', rating: 4, date: '2024-09-15', verified: true, text: 'Premium build quality and excellent tracking. A bit expensive but worth every naira for the productivity boost it gives you.', helpful: 14 }
  ],
  'hp-001': [
    { id: 'r16', user: 'Samuel G.', rating: 5, date: '2024-12-05', verified: true, text: 'AirPods Pro are game changers! The noise cancellation on the new ones is incredible. Use them daily for calls and music.', helpful: 42 },
    { id: 'r17', user: 'Aisha M.', rating: 4, date: '2024-11-18', verified: true, text: 'Sound quality is amazing and the fit is comfortable. Transparency mode works so well. Only wish the case was a bit smaller.', helpful: 15 },
    { id: 'r18', user: 'Victor E.', rating: 5, date: '2024-10-30', verified: true, text: 'Worth the upgrade from the first gen. The USB-C case is great, and the adaptive audio feature is brilliant.', helpful: 23 }
  ],
  'lp-005': [
    { id: 'r19', user: 'Raphael O.', rating: 5, date: '2024-11-12', verified: true, text: 'The ThinkPad X1 Carbon is the gold standard for business laptops. Keyboard is the best I\'ve used. MIL-STD tested and feels indestructible.', helpful: 29 },
    { id: 'r20', user: 'Grace I.', rating: 4, date: '2024-10-05', verified: true, text: 'Excellent build quality and performance. The OLED display is stunning for document work. Battery life could be a bit better though.', helpful: 11 }
  ]
};

export const getReviewsByProductId = (productId) => reviews[productId] || [];

export const getAverageRating = (productId) => {
  const productReviews = reviews[productId];
  if (!productReviews || productReviews.length === 0) return 0;
  return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
};

export const getRatingBreakdown = (productId) => {
  const productReviews = reviews[productId] || [];
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach(r => { breakdown[r.rating]++; });
  return breakdown;
};
