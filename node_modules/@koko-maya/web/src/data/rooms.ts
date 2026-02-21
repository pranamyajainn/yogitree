// apps/web/src/data/rooms.ts
export interface RoomType {
    slug: string;
    name: string;
    size: number;
    maxGuests: number;
    bedType: string;
    description: string;
    longDescription: string;
    image: string;
    gallery: string[];
    startingPrice: number;
    highlights: string[];
    amenities: { icon: string; label: string }[];
}

export const rooms: RoomType[] = [
    {
        slug: 'deluxe-room-balcony',
        name: 'Deluxe Room With Balcony',
        size: 280,
        maxGuests: 5,
        bedType: 'Double Bed',
        description: 'A 280 sq. ft. room for up to 5 guests, complete with a balcony where gentle sea breezes greet your morning coffee.',
        longDescription: 'Our Deluxe Room with Balcony offers the perfect blend of coastal charm and modern comfort. Spanning 280 sq. ft., this thoughtfully designed space is ideal for families or groups of up to 5 guests. The highlight is the private balcony, where you can start your day with the refreshing Morjim sea breeze. Inside, you\'ll find a plush double bed, warm ambient lighting, and high-quality amenities to ensure a restful stay.',
        image: '/images/rooms/deluxe-balcony.jpg',
        gallery: [
            '/images/rooms/deluxe-1.jpg',
            '/images/rooms/deluxe-2.jpg',
            '/images/rooms/deluxe-3.jpg',
        ],
        startingPrice: 4500,
        highlights: ['Balcony', 'Sea Breeze', 'Free Wi-Fi'],
        amenities: [
            { icon: 'p-wi-fi', label: 'High Speed Wi-Fi' },
            { icon: 'p-air-conditioner', label: 'Air Conditioning' },
            { icon: 'p-tv', label: 'Smart TV' },
            { icon: 'p-mini-bar', label: 'Mini Bar' },
            { icon: 'p-tea-coffee', label: 'Tea & Coffee Maker' },
            { icon: 'p-bottle', label: 'Complimentary Water' },
            { icon: 'p-safe', label: 'In-room Safe' },
            { icon: 'p-hair-dryer', label: 'Hair Dryer' },
            { icon: 'p-toiletries', label: 'Premium Toiletries' },
        ]
    },
    {
        slug: 'executive-room-balcony',
        name: 'Executive Room With Balcony',
        size: 300,
        maxGuests: 5,
        bedType: '4-Poster King Size',
        description: 'A 300 sq. ft. room featuring a 4-poster king size bed and warm, inviting lighting that lets in the refreshing sea breeze.',
        longDescription: 'Elevate your stay in our Executive Room with Balcony. This 300 sq. ft. sanctuary features a stunning 4-poster king size bed, adding a touch of classic elegance to your beachside retreat. The room is bathed in warm, inviting light and designed to catch the Morjim sea breeze. With premium amenities and a spacious balcony, it’s the ideal choice for those seeking extra comfort and style.',
        image: '/images/rooms/executive-balcony.jpg',
        gallery: [
            '/images/rooms/exec-1.jpg',
            '/images/rooms/exec-2.jpg',
            '/images/rooms/exec-3.jpg',
        ],
        startingPrice: 5500,
        highlights: ['4-Poster Bed', 'Sea Breeze', 'Work Desk'],
        amenities: [
            { icon: 'p-wi-fi', label: 'High Speed Wi-Fi' },
            { icon: 'p-air-conditioner', label: 'Air Conditioning' },
            { icon: 'p-tv', label: 'Smart TV' },
            { icon: 'p-mini-bar', label: 'Mini Bar' },
            { icon: 'p-tea-coffee', label: 'Tea & Coffee Maker' },
            { icon: 'p-bottle', label: 'Complimentary Water' },
            { icon: 'p-safe', label: 'In-room Safe' },
            { icon: 'p-hair-dryer', label: 'Hair Dryer' },
            { icon: 'p-toiletries', label: 'Premium Toiletries' },
            { icon: 'p-desk', label: 'Executive Work Desk' },
        ]
    },
    {
        slug: 'executive-room-balcony-pool-view',
        name: 'Executive Room With Balcony & Pool View',
        size: 300,
        maxGuests: 5,
        bedType: 'King Size',
        description: 'Every detail — from the lighting and décor to the balcony pool views — has been thoughtfully designed for your perfect stay.',
        longDescription: 'Our Executive Room with Balcony & Pool View offers the ultimate resort experience. Overlooking our sparkling pool, this 300 sq. ft. room combines sophisticated décor with modern functionality. Wake up to the sight of our pool and the sea breeze on your private balcony. Whether you’re here for a quick getaway or a longer vacation, every detail has been curated to ensure your stay is nothing short of perfect.',
        image: '/images/rooms/executive-pool-view.jpg',
        gallery: [
            '/images/rooms/pool-view-1.jpg',
            '/images/rooms/pool-view-2.jpg',
            '/images/rooms/pool-view-3.jpg',
        ],
        startingPrice: 6500,
        highlights: ['Pool View', 'Designer Décor', 'Mini Bar'],
        amenities: [
            { icon: 'p-wi-fi', label: 'High Speed Wi-Fi' },
            { icon: 'p-air-conditioner', label: 'Air Conditioning' },
            { icon: 'p-tv', label: 'Smart TV' },
            { icon: 'p-mini-bar', label: 'Mini Bar' },
            { icon: 'p-tea-coffee', label: 'Tea & Coffee Maker' },
            { icon: 'p-bottle', label: 'Complimentary Water' },
            { icon: 'p-safe', label: 'In-room Safe' },
            { icon: 'p-hair-dryer', label: 'Hair Dryer' },
            { icon: 'p-toiletries', label: 'Premium Toiletries' },
        ]
    },
];
