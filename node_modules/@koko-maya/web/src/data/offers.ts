// apps/web/src/data/offers.ts
export interface Offer {
    slug: string;
    title: string;
    summary: string;
    description: string;
    badge: string;
    promoCode: string | null;
    validUntil: string | null;
    image: string;
    terms: string[];
}

export const offers: Offer[] = [
    {
        slug: 'direct-booking-40-off',
        title: '40% Off on Direct Bookings',
        summary: 'Unlock 40% off across all room types when you book directly. A special rate made for travellers who love great stays without the extra hassle.',
        description: 'There is nothing quite like the ease of a direct booking. When you book directly through our website, we pass the savings on to you. Enjoy a flat 40% discount on the best available rate for any room type. Whether it’s a weekend getaway or a long spiritual retreat in North Goa, booking direct ensures you get the most value for your stay.',
        badge: 'Best Value',
        promoCode: 'DIRECT40',
        validUntil: '2026-12-31',
        image: '/images/offers/direct-booking.jpg',
        terms: [
            'Applicable on all room types.',
            'Must use promo code DIRECT40 at checkout.',
            'Discount applies to the base room rate only.',
            'Cannot be combined with other promotional offers.'
        ]
    },
    {
        slug: 'member-discount',
        title: 'Member-only Discount — 5% Off',
        summary: 'Unlock extra savings with our exclusive members-only offer. Enjoy a flat 5% discount and make every stay a little more rewarding.',
        description: 'Loyalty deserves to be rewarded. Sign up as a member of Yogi Tree Resort and unlock an additional 5% discount on all your bookings. It’s our way of saying thank you for choosing us as your home in Morjim. Member discounts are applied automatically when you log in or use your member unique code.',
        badge: 'Members',
        promoCode: 'MEMBER5',
        validUntil: null,
        image: '/images/offers/member-discount.jpg',
        terms: [
            'Requires active membership status.',
            'Valid on all room types year-round.',
            'Discount is calculated on the already discounted direct rate if applicable.'
        ]
    },
    {
        slug: 'dine-and-save',
        title: 'Dine & Save: 10% Off Food & Beverages',
        summary: 'Enjoy 10% off on all food and beverage orders during your stay. From relaxed breakfasts to indulgent dinners, every meal becomes a little more delightful.',
        description: 'Great vacations are fueled by great food. During your stay at Yogi Tree Resort, enjoy a 10% discount on all your orders at our multi-cuisine restaurant, "Curry, Wok & Waves". From traditional Goan fish curry to vibrant Chinese stir-frys, savour the flavours of the coast for less.',
        badge: 'Dining',
        promoCode: null,
        validUntil: null,
        image: '/images/offers/dining-discount.jpg',
        terms: [
            'Valid for in-house guests only.',
            'Applicable on all food and non-alcoholic beverages.',
            'Discount applied at the time of final billing.'
        ]
    },
];
