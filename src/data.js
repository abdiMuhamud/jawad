// ─────────────────────────────────────────────────────────────
//  Al Jawad — restaurant details & full menu
//  Source: Al Jawad digital menu (ScanGOW), Instagram & TikTok.
//  Edit prices / dishes here — the whole site updates from this file.
// ─────────────────────────────────────────────────────────────

export const INFO = {
  name: 'Al Jawad',
  tagline: 'Butchery & Restaurant',
  whatsapp: '220877711717',
  phone: '+220877711717',
  phoneDisplay: '+220 87 7711 717',
  address: 'Pipeline, off Kairaba Avenue, next to the Lebanese School',
  area: 'Kanifing, The Gambia',
  coords: [13.4592478, -16.6834376],
  maps: 'https://maps.app.goo.gl/BBg85WXxEXBR6xqZ7',
  instagram: 'https://www.instagram.com/aljawad.gm',
  tiktok: 'https://www.tiktok.com/@aljawad.gm',
  facebook: 'https://www.facebook.com/share/18kZKefMZy/',
  openingDate: '2026-11-13',
  // Set real opening hours here when confirmed, e.g. 'Daily · 8:00 – 00:00'.
  hours: null,
};

export const CURRENCY = 'GMD';

// tags: sig = signature, veg = vegetarian, hot = spicy, share = for sharing
export const MENU = [
  {
    id: 'breakfast', name: 'Breakfast', ar: 'الفطور',
    blurb: 'Slow Lebanese mornings — warm beans, eggs from the pan and sweet knefeh.',
    items: [
      ['brk-001', 'Foul Medames', 'فول مدمّس', 400, 'Cooked fava beans with garlic and fresh lemon juice.', ['veg']],
      ['brk-002', 'Musabaha', 'مسبّحة', 400, 'Warm cooked chickpeas with tahini, garlic and lemon juice.', ['veg']],
      ['brk-003', 'Eggs with Meat (Ras Asfour)', 'بيض بلحمة', 500, 'Fresh eggs cooked with small beef cubes.', []],
      ['brk-004', 'Shakshuka', 'شكشوكة', 450, 'Fresh eggs cooked with fresh tomatoes and garlic.', ['veg']],
      ['brk-005', 'Sunny-Side-Up Eggs', 'بيض عيون', 300, 'Three fresh eggs cooked sunny-side up.', ['veg']],
      ['brk-006', 'Fattet Hummus with Beef', 'فتّة حمّص باللحمة', 600, 'Cooked chickpeas with toasted Lebanese bread, yogurt, cooked beef cubes and fresh parsley.', []],
      ['brk-007', 'Knefeh', 'كنافة', 700, 'The traditional Lebanese sweet-cheese dessert, served warm (when available).', ['sig']],
    ],
  },
  {
    id: 'saj', name: 'Saj', ar: 'صاج',
    blurb: 'Paper-thin dough stretched by hand and baked on the domed saj.',
    items: [
      ['saj-001', 'Cheese', 'جبنة', 300, 'Saj bread folded over melted cheese.', ['veg']],
      ['saj-002', 'Cheese & Sujuk', 'جبنة وسجق', 350, 'Melted cheese with spiced Lebanese sujuk.', []],
      ['saj-003', 'Cheese & Zaatar', 'جبنة وزعتر', 325, 'The classic pairing — wild-thyme zaatar and melted cheese.', ['veg']],
      ['saj-004', 'Kishk', 'كشك', 350, 'Fermented yogurt-and-bulgur kishk, a mountain-village favourite.', ['veg']],
      ['saj-005', 'Labneh with Onions', 'لبنة وبصل', 250, 'Creamy labneh with fresh onion.', ['veg']],
      ['saj-006', 'Spicy Zaatar', 'زعتر حار', 200, 'Zaatar and olive oil with a chilli kick.', ['veg', 'hot']],
    ],
  },
  {
    id: 'cold-mezze', name: 'Cold Mezze', ar: 'مازة باردة',
    blurb: 'Small plates, big generosity — the heart of the Lebanese table.',
    items: [
      ['cmz-001', 'Hummus with Tahini', 'حمّص بطحينة', 350, 'Chickpeas blended with tahini, garlic and fresh lemon juice, drizzled with extra virgin olive oil.', ['veg']],
      ['cmz-002', 'Al Jawad Hummus', 'حمّص الجواد', 450, 'Our signature creamy hummus topped with tender beef cubes, toasted pine nuts and olive oil.', ['sig']],
      ['cmz-003', 'Baba Ghanouj', 'بابا غنّوج', 400, 'Smoky grilled eggplant with creamy tahini, fresh lemon juice, garlic and olive oil.', ['veg']],
      ['cmz-004', 'Al Jawad Moutabbal', 'متبّل الجواد', 450, 'Creamy smoked eggplant dip prepared with tahini and topped with fried eggplant.', ['veg', 'sig']],
      ['cmz-005', 'Stuffed Grape Leaves', 'ورق عنب', 550, 'Vine leaves rolled with rice, fresh herbs and vegetables.', ['veg']],
      ['cmz-006', 'Beetroot Mutabal', 'متبّل شمندر', 500, 'Roasted beetroot with tahini, yogurt, lemon, garlic and olive oil, finished with walnuts and pomegranate.', ['veg']],
      ['cmz-007', 'Mix Hummus', 'حمّص مشكّل', 450, 'A trio of our hummus — made for sharing.', ['veg', 'share']],
    ],
  },
  {
    id: 'hot-mezze', name: 'Hot Mezze', ar: 'مازة ساخنة',
    blurb: 'From the fryer, the oven and the pan — straight to the middle of the table.',
    items: [
      ['hmz-001', 'Sujuk', 'سجق', 600, 'Spiced Lebanese sausage, pan-seared.', ['hot']],
      ['hmz-002', 'Makanek', 'مقانق', 600, 'Lebanese mini sausages.', []],
      ['hmz-003', 'Lebanese Kibbeh (4 pcs)', 'كبّة لبنانية', 500, 'Crisp bulgur shells filled with spiced minced meat.', []],
      ['hmz-004', 'Cheese Rolls (5 pcs)', 'رقائق جبنة', 450, 'Golden, crisp rolls with molten cheese.', ['veg']],
      ['hmz-005', 'Vegetable Rolls (5 pcs)', 'رقائق خضار', 450, 'Crisp rolls filled with seasoned vegetables.', ['veg']],
      ['hmz-006', 'Shrimp Rolls (6 pcs)', 'رقائق قريدس', 500, 'Crisp golden rolls with shrimp.', []],
      ['hmz-007', 'Meat Pies (4 pcs)', 'صفيحة', 450, 'Open-faced pies with spiced minced meat.', []],
      ['hmz-008', 'Bisap Pies (4 pcs)', 'فطاير', 400, 'Golden baked pies, four to an order.', []],
      ['hmz-009', 'Falafel (5 pcs)', 'فلافل', 600, 'Crisp chickpea-and-herb fritters.', ['veg']],
      ['hmz-010', 'Barbecue Chicken Wings (6 pcs)', 'جوانح باربكيو', 450, 'Sticky barbecue-glazed wings.', []],
      ['hmz-011', 'Buffalo Chicken Wings (6 pcs)', 'جوانح بافلو', 650, 'Wings tossed in hot buffalo sauce.', ['hot']],
      ['hmz-012', 'Lamb Ras Asfour, Pomegranate', 'راس عصفور بدبس الرمّان', 600, 'Small pieces of lamb with pomegranate molasses.', []],
      ['hmz-013', 'Arayes Kafta (1 loaf)', 'عرايس كفتة', 300, 'Lebanese bread stuffed with kafta and grilled crisp.', []],
      ['hmz-014', 'Chopped Liver, Pomegranate', 'سودة بدبس الرمّان', 600, 'Chopped liver prepared with onion and pomegranate molasses.', []],
    ],
  },
  {
    id: 'salads', name: 'Salads', ar: 'سلطات',
    blurb: 'Bright, sharp and green — parsley, sumac, lemon and good oil.',
    items: [
      ['sal-001', 'Tabbouleh', 'تبّولة', 800, 'Chopped parsley, tomato, finely chopped onion, bulgur, olive oil and lemon juice.', ['veg']],
      ['sal-002', 'Fattoush', 'فتّوش', 600, 'Lettuce, cucumber, tomato, radish, purslane, thyme, arugula, sumac, pomegranate molasses, fried bread and red cabbage.', ['veg', 'sig']],
      ['sal-003', 'Rocca Salad with Beetroot', 'سلطة روكا وشمندر', 550, 'Peppery rocca with sweet roasted beetroot.', ['veg']],
      ['sal-004', 'Chicken Caesar Salad', 'سلطة سيزر بالدجاج', 800, 'Lettuce, Caesar sauce, thyme croutons, parmesan, cherry tomatoes and grilled chicken breast.', []],
    ],
  },
  {
    id: 'mashawi', name: 'Al Jawad Mashawi', ar: 'مشاوي الجواد',
    blurb: 'Skewers over real charcoal — the reason we lit the fire.',
    items: [
      ['bbq-001', 'Grilled Lamb (Plate)', 'لحم غنم مشوي', 1200, 'Three skewers served with hummus, biwaz, grilled onion and tomato.', ['sig']],
      ['bbq-002', 'Kafta (Plate)', 'كفتة', 1100, 'Four skewers served with hummus, biwaz, grilled onion, tomato and pickles.', ['sig']],
      ['bbq-003', 'Kabab (Plate)', 'كباب', 1100, 'Four skewers served with hummus, biwaz, grilled tomato, grilled onion, pickles and spicy bread.', []],
      ['bbq-004', 'Tawook (Plate)', 'شيش طاووق', 900, 'Three skewers served with garlic cream, pickles, French fries and spicy bread.', []],
      ['bbq-005', 'Lamb Chops', 'ريش غنم', 800, 'Four pieces of charcoal-grilled lamb chops.', ['sig']],
      ['bbq-006', 'Lamb BBQ (1 kg)', 'مشاوي غنم ١ كغ', 3000, 'A full kilo of lamb from the grill — for the whole table.', ['share']],
      ['bbq-007', 'Kafta (1 kg)', 'كفتة ١ كغ', 2200, 'A kilo of kafta skewers, straight off the coals.', ['share']],
      ['bbq-008', 'Tawook (1 kg)', 'طاووق ١ كغ', 2200, 'A kilo of marinated chicken tawook.', ['share']],
    ],
  },
  {
    id: 'taste-of-lebanon', name: 'Taste of Lebanon', ar: 'من طعم لبنان',
    blurb: 'Butcher’s-counter classics — raw dishes of the south, and steaks done right.',
    items: [
      ['tol-001', 'Malseh (200 g)', 'ملسة', 400, 'Finely worked raw meat, the southern-Lebanese way.', []],
      ['tol-002', 'Frakeh (200 g)', 'فراكة', 400, 'Raw kibbeh from the south, kneaded with herbs and spices.', []],
      ['tol-003', 'Hand-Chopped Raw Meat (200 g)', 'لحمة نيّة عالسكين', 450, 'Raw meat finely chopped using two knives.', []],
      ['tol-004', 'Raw Kibbeh (Kibbeh Nayeh)', 'كبّة نيّة', 450, 'Lebanon’s celebrated raw kibbeh with fine bulgur.', []],
      ['tol-005', 'Swiss Cheese Steak', 'ستيك بالجبنة السويسرية', 1200, 'Beef steak finished with melting Swiss cheese.', []],
      ['tol-006', 'Mushroom Steak', 'ستيك بالفطر', 1100, 'Beef steak with Swiss mushroom sauce and Emmental cheese.', []],
      ['tol-007', 'Al Jawad Steak', 'ستيك الجواد', 1300, 'Beef steak with mustard and grated Parmesan cheese.', ['sig']],
      ['tol-008', 'Chicken Fettuccine', 'فيتوتشيني دجاج', 700, 'Fettuccine with grilled chicken breast, fresh cooking cream and Parmesan.', []],
    ],
  },
  {
    id: 'chicken', name: 'Chicken Plates', ar: 'أطباق الدجاج',
    blurb: 'Over charcoal or from the grill — always with garlic cream close by.',
    items: [
      ['chk-005', 'Charcoal-Grilled Half Chicken', 'نصف فرّوج عالفحم', 400, 'Half a chicken, marinated and grilled over charcoal.', []],
      ['chk-006', 'Charcoal-Grilled Whole Chicken', 'فرّوج كامل عالفحم', 800, 'A whole chicken, marinated and grilled over charcoal.', ['share']],
      ['chk-003', 'Grilled Half Chicken', 'نصف فرّوج مشوي', 400, 'Half a chicken, golden from the grill.', []],
      ['chk-004', 'Grilled Whole Chicken', 'فرّوج مشوي كامل', 800, 'A whole chicken, golden from the grill.', ['share']],
      ['chk-002', 'Chicken Escalope (3 pcs)', 'إسكالوب دجاج', 600, 'Crumbed chicken escalope, served with coleslaw.', []],
      ['chk-001', 'Crispy Chicken (4 pcs)', 'كريسبي دجاج', 600, 'Served with coleslaw, garlic cream, pickles and French fries.', []],
    ],
  },
  {
    id: 'sandwiches', name: 'Sandwiches', ar: 'سندويشات',
    blurb: 'Wrapped in Lebanese bread or the wide, thin markook.',
    items: [
      ['snd-001', 'Beef Shawarma — Lebanese Bread', 'شاورما لحمة', 300, 'Beef shawarma rolled in Lebanese bread.', []],
      ['snd-002', 'Beef Shawarma — Markook', 'شاورما لحمة مرقوق', 600, 'Beef shawarma in large, thin markook bread.', ['sig']],
      ['snd-003', 'Chicken Shawarma — Lebanese Bread', 'شاورما دجاج', 250, 'Chicken shawarma rolled in Lebanese bread.', []],
      ['snd-004', 'Chicken Shawarma — Markook', 'شاورما دجاج مرقوق', 500, 'Chicken shawarma in large, thin markook bread.', []],
      ['snd-005', 'Sujuk', 'سجق', 250, 'Spiced Lebanese sausage in bread.', ['hot']],
      ['snd-006', 'Falafel — Lebanese Bread', 'فلافل', 250, 'Falafel rolled in Lebanese bread.', ['veg']],
      ['snd-007', 'Falafel — Markook', 'فلافل مرقوق', 400, 'Falafel in large, thin markook bread.', ['veg']],
      ['snd-008', 'Malsi', 'ملسة', 300, 'Malseh, wrapped to go.', []],
      ['snd-009', 'Barbecue Lamb', 'لحم مشوي', 300, 'Grilled lamb in bread.', []],
      ['snd-010', 'Kafta', 'كفتة', 250, 'Grilled kafta in bread.', []],
      ['snd-011', 'Tawook', 'طاووق', 250, 'Grilled chicken tawook in bread.', []],
      ['snd-012', 'Liver', 'سودة', 250, 'Liver in bread.', []],
    ],
  },
  {
    id: 'burgers', name: 'Burgers', ar: 'برغر',
    blurb: 'Big, bold and stacked — Beirut street-food energy.',
    items: [
      ['brg-005', 'Dragon Burger', 'دراغون برغر', 550, 'Chicken Zinger, ranch sauce, jalapeños, mozzarella sticks, Lollo Rosso lettuce and tomato.', ['sig', 'hot']],
      ['brg-001', 'Lebanese Special', 'برغر لبناني', 300, 'Beef patty, tomato, onion, coleslaw, chips and ketchup.', []],
      ['brg-002', 'Classic Zinger', 'زنجر كلاسيك', 400, 'Chicken Zinger, mayonnaise, tomato, pickles, lettuce, barbecue, cheddar and cocktail sauces.', []],
      ['brg-003', 'Chicken Breast Burger', 'برغر صدر دجاج', 475, 'Chicken breast, mayonnaise, garlic cream, pickles, lettuce and cocktail sauce.', []],
      ['brg-004', 'Swiss Mushroom Burger', 'سويس مشروم', 475, 'Beef patty, Swiss mushrooms and Emmental cheese.', []],
      ['brg-006', 'Zinger Supreme', 'زنجر سوبريم', 550, 'Chicken Zinger, mayonnaise, tomato, pickles, cheddar sauce, smoked turkey, barbecue and cocktail sauces.', []],
    ],
  },
  {
    id: 'snack-sandwiches', name: 'Snack Sandwiches', ar: 'سندويشات سناك',
    blurb: 'Toasted, melted, loaded.',
    items: [
      ['sss-001', 'Chicken Submarine', 'سبمارين دجاج', 475, 'Chicken, mayonnaise, smoked turkey, tomato, corn and mozzarella with special sauce.', []],
      ['sss-002', 'Chicken Fajita', 'فاهيتا دجاج', 400, 'Chicken breast, onion, mushrooms, sweet pepper and mozzarella with special sauce.', []],
      ['sss-003', 'Cheesy Beef', 'تشيزي بيف', 550, 'Faux-filet beef, mayonnaise, Emmental and cheddar, pickles and lettuce.', []],
      ['sss-004', 'Crispy Chicken', 'كريسبي دجاج', 400, 'Crunchy chicken breast, garlic cream, pickles, French fries, coleslaw and special sauce.', []],
    ],
  },
  {
    id: 'pizza', name: 'Pizza', ar: 'بيتزا',
    blurb: 'Stone-baked, generously topped.',
    items: [
      ['piz-001', 'Margherita', 'مارغريتا', 600, 'Cheese and pizza sauce.', ['veg']],
      ['piz-002', 'Vegetarian', 'خضار', 700, 'Pizza sauce, sweet pepper, onion, tomato, mushrooms and cheese.', ['veg']],
      ['piz-003', 'Sujuk', 'سجق', 700, 'Sujuk and cheese.', ['hot']],
      ['piz-004', 'Meatzza', 'ميتزا', 800, 'Beef, onion, tomato, mushrooms and cheese.', []],
      ['piz-005', 'Con Pollo', 'كون بولو', 800, 'Chicken breast, sweet pepper, onion, mushrooms and cheese.', []],
    ],
  },
  {
    id: 'drinks', name: 'Drinks', ar: 'مشروبات',
    blurb: 'Cardamom coffee from the rakweh, fresh juices and something cold.',
    items: [
      ['drk-009', 'Lebanese Coffee — Small', 'قهوة لبنانية صغيرة', 350, 'Rich, cardamom-scented coffee brewed in the rakweh.', []],
      ['drk-010', 'Lebanese Coffee — Medium', 'قهوة لبنانية وسط', 425, 'Rich, cardamom-scented coffee brewed in the rakweh.', []],
      ['drk-011', 'Lebanese Coffee — Large', 'قهوة لبنانية كبيرة', 500, 'A pot to share — brewed in the rakweh.', ['share']],
      ['drk-005', 'Espresso', 'إسبريسو', 100, 'A short, intense shot.', []],
      ['drk-006', 'Cappuccino', 'كابتشينو', 150, 'Espresso with silky steamed milk.', []],
      ['drk-007', 'Tea', 'شاي', 100, 'Hot tea, served the Lebanese way.', []],
      ['drk-008', 'Ginger Tea', 'شاي بالزنجبيل', 100, 'Warming fresh-ginger tea.', []],
      ['drk-013', 'Sunshine Fresh Orange Juice', 'عصير برتقال طازج', 400, 'Freshly squeezed orange juice.', []],
      ['drk-012', 'Daily Juice Selection', 'عصير اليوم', 400, 'Ask about the juices available today.', []],
      ['drk-004', 'Canned Juice', 'عصير معلّب', 100, 'Chilled canned juice.', []],
      ['drk-003', 'Soft Drink', 'مشروب غازي', 100, 'Ice-cold soft drink.', []],
      ['drk-001', 'Large Water', 'مياه كبيرة', 100, 'Large bottled water.', []],
      ['drk-002', 'Small Water', 'مياه صغيرة', 50, 'Small bottled water.', []],
    ],
  },
  {
    id: 'shisha', name: 'Shisha', ar: 'أرجيلة',
    blurb: 'Linger a little longer.',
    items: [
      ['shs-001', 'Shisha — Double Apple', 'أرجيلة تفاحتين', 700, 'The Levantine classic: aniseed-sweet double apple.', []],
      ['shs-002', 'Shisha — Love', 'أرجيلة لاف', 700, 'A fruity, floral house favourite.', []],
      ['shs-003', 'Shisha — Hawaii', 'أرجيلة هاواي', 700, 'Tropical fruit with a cool finish.', []],
    ],
  },
].map((cat) => ({
  ...cat,
  items: cat.items.map(([id, name, ar, price, desc, tags]) => ({ id, name, ar, price, desc, tags, cat: cat.id })),
}));

export const ITEMS = Object.fromEntries(MENU.flatMap((c) => c.items).map((i) => [i.id, i]));

export const SIGNATURES = ['cmz-002', 'bbq-002', 'bbq-005', 'snd-002', 'brg-005', 'tol-007', 'sal-002', 'brk-007'];

export const REELS = [
  { id: '7701738304504368405', local: '/video/grill-reel.mp4', title: 'We brought the grill to you', views: '6.4K' },
  { id: '7706160518704450836', title: 'Meet the Dragon Burger', views: '2.9K' },
  { id: '7707325781206109461', title: 'The countdown is over', views: '390' },
  { id: '7705491026504469781', title: 'A new experience in The Gambia', views: '325' },
  { id: '7701701508202597652', title: 'Something big is coming', views: '3.3K' },
  { id: '7699126504030014740', title: 'Are you ready?', views: '2.3K' },
];

export const img = (id) => `/img/menu/${id}.webp`;
export const imgLg = (id) => `/img/menu/${id}-lg.webp`;
export const fmt = (n) => `${CURRENCY} ${n.toLocaleString('en-US')}`;
