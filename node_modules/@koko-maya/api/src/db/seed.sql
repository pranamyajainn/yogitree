-- seed.sql: Seed data for development and staging
-- Run: psql $DATABASE_URL < apps/api/src/db/seed.sql

-- ── PROPERTY ──────────────────────────────────────────────
INSERT INTO property (id, name, slug, tagline, description, address, phone, email, lat, lng, ezee_property_id)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Yogi Tree Resort',
  'koko-maya-morjim',
  'Where the Sea Breeze Becomes Your Morning.',
  'A boutique beach resort steps from Morjim Beach, North Goa. Three thoughtfully designed room types — each with a private balcony — plus an open-air multi-cuisine restaurant, swimming pool, and curated concierge services.',
  '{"streetAddress": "[Street Address]", "addressLocality": "Morjim", "addressRegion": "Goa", "postalCode": "403512", "addressCountry": "IN"}',
  '+91 73 5315 0111',
  'hello@yourcustomdomain.com',
  15.6230000,
  73.7450000,
  'REPLACE_WITH_EZEE_PROPERTY_ID'
);

-- ── ROOM TYPES ────────────────────────────────────────────
INSERT INTO room_type (id, property_id, name, slug, size_sqft, max_guests, bed_type, description, sort_order) VALUES
  (
    'r1000000-0000-0000-0000-000000000001',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Deluxe Room With Balcony',
    'deluxe-room-balcony',
    280, 5, 'Double Bed',
    'A 280 sq. ft. room for up to 5 guests, complete with a balcony where gentle sea breezes greet your morning coffee or in-room dinner.',
    1
  ),
  (
    'r1000000-0000-0000-0000-000000000002',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Executive Room With Balcony',
    'executive-room-balcony',
    300, 5, '4-Poster King Size Bed',
    'A 300 sq. ft. room featuring a 4-poster king size bed with warm, inviting lighting that lets in the refreshing sea breeze and city-style amenities.',
    2
  ),
  (
    'r1000000-0000-0000-0000-000000000003',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Executive Room With Balcony & Pool View',
    'executive-room-balcony-pool-view',
    300, 5, 'King Size Bed',
    'Every detail in this 300 sq. ft. room — from the lighting and décor to the amenities and the balcony pool views — has been thoughtfully designed for your stay.',
    3
  );

-- ── AMENITIES ─────────────────────────────────────────────
INSERT INTO amenity (id, name, icon, hours, is_chargeable, category) VALUES
  ('am01-0000-0000-0000-000000000001', 'Open-air Movie Theatre', 'film',     '4:00 PM – 10:00 PM', false, 'property'),
  ('am01-0000-0000-0000-000000000002', '24-hour Travel Desk',    'calendar', 'Always open',         false, 'property'),
  ('am01-0000-0000-0000-000000000003', 'Car / Bike Rentals',     'car',      'On request',          false, 'property'),
  ('am01-0000-0000-0000-000000000004', 'Concierge Service',      'star',     'Always available',    false, 'property'),
  ('am01-0000-0000-0000-000000000005', '24-hour Front Desk',     'clock',    'Always open',         false, 'property'),
  ('am01-0000-0000-0000-000000000006', 'Swimming Pool',          'droplets', '8:00 AM – 8:00 PM',   false, 'property'),
  ('am01-0000-0000-0000-000000000007', 'Multi-cuisine Restaurant','utensils','As per meal timings', false, 'property'),
  ('am01-0000-0000-0000-000000000008', 'Kids'' Play Area',       'smile',    '8:00 AM – 8:00 PM',   false, 'property'),
  ('am01-0000-0000-0000-000000000009', 'Indoor / Outdoor Games', 'activity', '8:00 AM – 8:00 PM',   false, 'property'),
  ('am01-0000-0000-0000-000000000010', 'Laundry Service',        'shirt',    null,                  true,  'property'),
  ('am01-0000-0000-0000-000000000011', 'Room Service',           'bell',     '8:00 AM – 10:30 PM',  false, 'property'),
  ('am01-0000-0000-0000-000000000012', 'CCTV Surveillance',      'shield',   '24/7',                false, 'property'),
  ('am01-0000-0000-0000-000000000013', 'Free Parking',           'parking',  'Always available',    false, 'property');

-- ── RATE PLANS ────────────────────────────────────────────
INSERT INTO rate_plan (room_type_id, name, base_price_inr, meal_plan) VALUES
  ('r1000000-0000-0000-0000-000000000001', 'Room Only',              3800, 'EP'),
  ('r1000000-0000-0000-0000-000000000001', 'Breakfast Included',     4500, 'CP'),
  ('r1000000-0000-0000-0000-000000000002', 'Room Only',              4800, 'EP'),
  ('r1000000-0000-0000-0000-000000000002', 'Breakfast Included',     5500, 'CP'),
  ('r1000000-0000-0000-0000-000000000003', 'Room Only',              5800, 'EP'),
  ('r1000000-0000-0000-0000-000000000003', 'Breakfast Included',     6500, 'CP');

-- ── OFFERS ────────────────────────────────────────────────
INSERT INTO offer (property_id, title, slug, summary, description, discount_type, discount_value, promo_code, valid_from, is_active) VALUES
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    '40% Off on Direct Bookings', 'direct-booking-40-off',
    'Unlock 40% off across all room types when you book directly.',
    'Book directly on our website and enjoy a flat 40% off on the best available rate. No middlemen, no extra fees — just great stays at great value. Applicable on all room types.',
    'percent', 40, 'DIRECT40', '2026-01-01', true
  ),
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Member-only Discount — 5% Off', 'member-discount',
    'Enjoy a flat 5% discount on all Yogi Tree stays as a loyalty member.',
    'Sign up as a member and unlock 5% off every time you book. Stack with other eligible offers for maximum savings.',
    'percent', 5, 'MEMBER5', '2026-01-01', true
  ),
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Dine & Save: 10% Off Food & Beverages', 'dine-and-save',
    'Enjoy 10% off on all food and beverage orders at Curry, Wok & Waves during your stay.',
    'From relaxed breakfasts to indulgent dinners at our rooftop restaurant, every meal becomes a little more delightful with 10% off. Automatically applied to your folio.',
    'percent', 10, null, '2026-01-01', true
  );

-- ── TESTIMONIALS ──────────────────────────────────────────
INSERT INTO testimonial (property_id, author_name, title, body, rating, sort_order) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Priya S.',         'Rooms that Feel Like Home',             'Stayed at Yogi Tree and had an amazing experience! The hotel is beautiful, the rooms are clean and comfortable. The staff went above and beyond to ensure we were well taken care of.',          5, 1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Rahul M.',         'The Perfect Blend of Comfort & Care',   'The accommodations were truly delightful and exceeded expectations. Breakfast was exceptional and the staff's attentiveness created a welcoming atmosphere throughout our stay.',             5, 2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ananya T.',        'Budget-friendly Comfort',               'The rooms are spacious, spotless, and budget-friendly, offering great value. The kitchen serves delicious meals with attentive service.',                                                   5, 3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Vikram & family',  'Special Care for Senior Guests',        'Set in a beautiful location. Staff is friendly and attentive. Breakfast offers a variety of options and the team is always ready to cater to special requests, especially senior citizens.', 5, 4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Deepa K.',         'Service You Can Count On',              'The staff was exceptionally friendly and always ready to help. Our rooms were spacious and spotless, and the food was delicious. Definitely worth experiencing!',                           5, 5);

-- ── ATTRACTIONS ───────────────────────────────────────────
INSERT INTO attraction (property_id, name, distance_m, sort_order) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Morjim Beach',                  700,   1),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ashvem Beach',                  2000,  2),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Morjai Temple',                 2000,  3),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Santa Khuris Mannar Chapel',    2000,  4),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Chapora River View Point',      2000,  5),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Chapora Fort',                  13000, 6);

-- ── SEO META ──────────────────────────────────────────────
INSERT INTO seo_meta (page_path, title, description) VALUES
  ('/',            'Yogi Tree Resort — Boutique Beach Resort in Morjim, Goa',         'Steps from Morjim Beach, enjoy sea-view rooms with balconies, open-air dining, a pool, and concierge services. Book direct for the best rate.'),
  ('/rooms/',      'Rooms & Rates — Yogi Tree Resort Morjim',                          'Explore 3 room types with private balconies and sea breezes at Yogi Tree Resort, Morjim, North Goa.'),
  ('/dining/',     'Curry, Wok & Waves Restaurant — Yogi Tree Resort',                 'Open-air multi-cuisine dining with beach views. Indian and Chinese cuisine, buffet and à la carte, at Yogi Tree Resort Morjim.'),
  ('/offers/',     'Special Offers & Deals — Yogi Tree Resort Morjim',                 'Exclusive offers and discount packages at Yogi Tree Resort. Book direct and save up to 40%.'),
  ('/gallery/',    'Photo Gallery — Yogi Tree Resort Morjim Goa',                      'Browse photos of rooms, the pool, our restaurant, and the beautiful surroundings of Yogi Tree Resort in Morjim, Goa.'),
  ('/facilities/', 'Facilities & Amenities — Yogi Tree Resort',                        'Swimming pool, open-air movie theatre, multi-cuisine restaurant, kids play area, concierge, and more at Yogi Tree Resort.'),
  ('/contact/',    'Location & Contact — Yogi Tree Resort Morjim',                     'Find Yogi Tree Resort in Morjim, North Goa. Get directions, contact details, and send an enquiry.'),
  ('/faq/',        'Frequently Asked Questions — Yogi Tree Resort',                    'Common questions about rooms, check-in times, facilities, dining, and booking at Yogi Tree Resort Morjim.');
