// Tech Products Seed Script - Generate realistic tech products
// Run with: node seed-tech-products.js

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

// Use service role key to bypass RLS
const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

// ============================================
// TECH CATEGORIES
// ============================================

const techCategories = [
    {
        name: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',

    },
    {
        name: 'Smartwatches',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',

    },
    {
        name: 'Earbuds & Headphones',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',

    },
    {
        name: 'Tablets',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',

    },
    {
        name: 'Laptops',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',

    }
];

// ============================================
// SMARTPHONES DATA
// ============================================

const smartphones = [
    {
        name: 'iPhone 15 Pro Max',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'The ultimate iPhone with titanium design, A17 Pro chip, and pro camera system. Features a stunning 6.7-inch Super Retina XDR display with ProMotion technology.',
        price: 129900,
        original_price: 149900,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'iPhone 15 Pro',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Forged in titanium with the powerful A17 Pro chip. 6.1-inch Super Retina XDR display with Always-On and ProMotion.',
        price: 114900,
        original_price: 134900,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'iPhone 15',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Dynamic Island, 48MP Main camera, and A16 Bionic chip. 6.1-inch Super Retina XDR display.',
        price: 79900,
        original_price: 89900,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Galaxy AI is here. 200MP camera with Space Zoom, S Pen built-in, and titanium frame. 6.8-inch Dynamic AMOLED 2X display.',
        price: 124999,
        original_price: 139999,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy S24+',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Premium Galaxy AI experience with 50MP camera and 6.7-inch display. Advanced Snapdragon 8 Gen 3 processor.',
        price: 89999,
        original_price: 99999,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy S24',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Compact powerhouse with Galaxy AI, 50MP camera, and 6.2-inch FHD+ display. All-day battery life.',
        price: 74999,
        original_price: 79999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Google Pixel 8 Pro',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Google AI meets pro-level camera. 6.7-inch LTPO OLED display, Tensor G3 chip, and incredible computational photography.',
        price: 99999,
        original_price: 109999,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'Google Pixel 8',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'The helpful Pixel with Google AI. 6.2-inch Actua display, amazing camera, and 7 years of updates.',
        price: 69999,
        original_price: 74999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'OnePlus 12',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Flagship killer with Snapdragon 8 Gen 3, 50MP Hasselblad camera, and 100W SUPERVOOC charging. 6.82-inch AMOLED display.',
        price: 64999,
        original_price: 69999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'OnePlus 12R',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Value flagship with Snapdragon 8 Gen 2, 50MP camera, and 100W fast charging. 6.78-inch 120Hz display.',
        price: 42999,
        original_price: 45999,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Xiaomi 14 Ultra',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Photography beast with Leica quad camera system, Snapdragon 8 Gen 3, and 6.73-inch LTPO AMOLED display.',
        price: 79999,
        original_price: 89999,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Nothing Phone 2',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Unique Glyph Interface, Snapdragon 8+ Gen 1, and pure Android experience. 6.7-inch LTPO AMOLED display.',
        price: 44999,
        original_price: 49999,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy A54 5G',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Mid-range powerhouse with 50MP OIS camera, 120Hz Super AMOLED display, and two-day battery life.',
        price: 38999,
        original_price: 42999,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Motorola Edge 40',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Sleek design with curved 6.55-inch pOLED display, 68W TurboPower charging, and clean Android.',
        price: 29999,
        original_price: 34999,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Realme GT 5 Pro',
        category: 'Smartphones',
        section: 'Electronics',
        description: 'Performance beast with Snapdragon 8 Gen 3, 50MP Sony IMX camera, and 240W fast charging.',
        price: 46999,
        original_price: 49999,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        is_trending: false,
        is_out_of_stock: false
    }
];

// ============================================
// SMARTWATCHES DATA
// ============================================

const smartwatches = [
    {
        name: 'Apple Watch Series 9 (45mm)',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Most advanced Apple Watch with S9 chip, double tap gesture, and precision finding. Bright Always-On Retina display.',
        price: 44900,
        original_price: 49900,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'Apple Watch Ultra 2',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'The most rugged and capable Apple Watch. Titanium case, action button, and up to 36 hours battery life.',
        price: 89900,
        original_price: 94900,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'Apple Watch SE (40mm)',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Essential Apple Watch features at a great value. Fitness tracking, safety features, and seamless connectivity.',
        price: 27900,
        original_price: 29900,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy Watch6 Classic',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Premium design with rotating bezel, comprehensive health tracking, and 40-hour battery life.',
        price: 38999,
        original_price: 42999,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy Watch6',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Sleek smartwatch with advanced sleep tracking, body composition analysis, and personalized workouts.',
        price: 32999,
        original_price: 35999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Garmin Forerunner 265',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Advanced running smartwatch with AMOLED display, training readiness, and up to 13 days battery life.',
        price: 46999,
        original_price: 49999,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Fitbit Sense 2',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Health-focused smartwatch with stress management tools, EDA sensor, and 6+ days battery life.',
        price: 24999,
        original_price: 27999,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Amazfit GTR 4',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Long-lasting smartwatch with 14-day battery, dual-band GPS, and 150+ sports modes.',
        price: 16999,
        original_price: 18999,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Noise ColorFit Pro 4',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Budget-friendly smartwatch with 1.72" display, 100+ sports modes, and 7-day battery life.',
        price: 3499,
        original_price: 4999,
        rating: 4.0,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Fire-Boltt Ninja Call Pro Plus',
        category: 'Smartwatches',
        section: 'Electronics',
        description: 'Value smartwatch with Bluetooth calling, 1.83" HD display, and IP67 water resistance.',
        price: 2499,
        original_price: 3999,
        rating: 3.9,
        image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500',
        is_trending: false,
        is_out_of_stock: false
    }
];

// ============================================
// EARBUDS & HEADPHONES DATA
// ============================================

const earbuds = [
    {
        name: 'AirPods Pro (2nd Gen)',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Adaptive Audio, active noise cancellation, and personalized spatial audio. Up to 6 hours listening time with ANC.',
        price: 24900,
        original_price: 26900,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'AirPods Max',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Premium over-ear headphones with high-fidelity audio, adaptive EQ, and active noise cancellation. Up to 20 hours battery life.',
        price: 59900,
        original_price: 64900,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'AirPods (3rd Gen)',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Personalized spatial audio with dynamic head tracking. Sweat and water resistant. Up to 6 hours listening time.',
        price: 19900,
        original_price: 21900,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy Buds2 Pro',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Intelligent 360-degree audio, enhanced ANC, and Hi-Fi sound quality. IPX7 water resistance.',
        price: 17999,
        original_price: 19999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Sony WF-1000XM5',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Industry-leading noise cancellation in a smaller design. LDAC audio, 8-hour battery life, and AI-based noise reduction.',
        price: 24990,
        original_price: 26990,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'Sony WH-1000XM5',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Flagship over-ear headphones with best-in-class noise cancellation, 30-hour battery, and premium sound quality.',
        price: 34990,
        original_price: 36990,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'Bose QuietComfort Earbuds II',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Personalized noise cancellation, CustomTune sound calibration, and up to 6 hours battery life.',
        price: 26999,
        original_price: 28999,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Beats Studio Buds+',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Powerful, balanced sound with active noise cancelling. Transparency mode and up to 9 hours listening time.',
        price: 16999,
        original_price: 18999,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'JBL Tune 760NC',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Over-ear wireless headphones with active noise cancelling and up to 50 hours battery life with ANC off.',
        price: 7999,
        original_price: 9999,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'OnePlus Buds Pro 2',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Premium TWS with dual DAC audio, adaptive ANC, and 39-hour total battery life with case.',
        price: 11999,
        original_price: 12999,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Nothing Ear (2)',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Transparent design with 40dB ANC, personalized sound, and up to 36 hours total playback with case.',
        price: 8999,
        original_price: 9999,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Realme Buds Air 5 Pro',
        category: 'Earbuds & Headphones',
        section: 'Electronics',
        description: 'Budget TWS with 50dB hybrid ANC, 11mm bass drivers, and 40-hour total battery life.',
        price: 4999,
        original_price: 5999,
        rating: 4.0,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        is_trending: false,
        is_out_of_stock: false
    }
];

// ============================================
// TABLETS DATA
// ============================================

const tablets = [
    {
        name: 'iPad Pro 12.9" (M2)',
        category: 'Tablets',
        section: 'Electronics',
        description: 'Ultimate iPad experience with M2 chip, Liquid Retina XDR display, and ProMotion technology. Professional creativity on the go.',
        price: 109900,
        original_price: 119900,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'iPad Air (M2)',
        category: 'Tablets',
        section: 'Electronics',
        description: 'Powerful M2 chip in a thin and light design. 10.9-inch Liquid Retina display with True Tone.',
        price: 64900,
        original_price: 69900,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'iPad (10th Gen)',
        category: 'Tablets',
        section: 'Electronics',
        description: 'Colorfully redesigned all-screen iPad with A14 Bionic chip. 10.9-inch Liquid Retina display.',
        price: 44900,
        original_price: 47900,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'iPad mini (6th Gen)',
        category: 'Tablets',
        section: 'Electronics',
        description: 'Portable powerhouse with A15 Bionic chip. 8.3-inch Liquid Retina display with True Tone and wide color.',
        price: 49900,
        original_price: 52900,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy Tab S9 Ultra',
        category: 'Tablets',
        section: 'Electronics',
        description: 'Massive 14.6" Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, S Pen included. Ultimate productivity tablet.',
        price: 104999,
        original_price: 109999,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1585790050230-5dd28404f511?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy Tab S9+',
        category: 'Tablets',
        section: 'Electronics',
        description: 'Premium 12.4" AMOLED display, powerful performance, and S Pen included. IP68 water resistance.',
        price: 79999,
        original_price: 84999,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1585790050230-5dd28404f511?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Samsung Galaxy Tab A9+',
        category: 'Tablets',
        section: 'Electronics',
        description: 'Affordable 11" tablet with quad speakers and long battery life. Perfect for entertainment.',
        price: 22999,
        original_price: 24999,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1585790050230-5dd28404f511?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Lenovo Tab P11 Pro',
        category: 'Tablets',
        section: 'Electronics',
        description: '11.5" OLED display, Snapdragon 730G, quad JBL speakers. Great for media consumption.',
        price: 38999,
        original_price: 41999,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1585790050230-5dd28404f511?w=500',
        is_trending: false,
        is_out_of_stock: false
    }
];

// ============================================
// LAPTOPS DATA
// ============================================

const laptops = [
    {
        name: 'MacBook Pro 16" (M3 Max)',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Ultimate pro laptop with M3 Max chip, stunning 16.2" Liquid Retina XDR display, and up to 22 hours battery life.',
        price: 349900,
        original_price: 369900,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'MacBook Pro 14" (M3 Pro)',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Supercharged for pros with M3 Pro chip. 14.2" Liquid Retina XDR display and up to 18 hours battery.',
        price: 239900,
        original_price: 259900,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'MacBook Air 15" (M2)',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Strikingly thin and fast with M2 chip. 15.3" Liquid Retina display and up to 18 hours battery life.',
        price: 134900,
        original_price: 144900,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'MacBook Air 13" (M2)',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Lightweight and powerful with M2 chip. 13.6" Liquid Retina display and all-day battery life.',
        price: 114900,
        original_price: 124900,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Dell XPS 15 (2024)',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Premium Windows laptop with Intel Core i7-13700H, 15.6" OLED display, and NVIDIA RTX 4060.',
        price: 189999,
        original_price: 199999,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Dell XPS 13 Plus',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Ultra-portable with 13.4" OLED display, Intel Core i7, and futuristic design. Perfect for professionals.',
        price: 164999,
        original_price: 174999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'HP Spectre x360 14',
        category: 'Laptops',
        section: 'Electronics',
        description: '2-in-1 convertible with Intel Core i7, 14" OLED touchscreen, and premium build quality.',
        price: 144999,
        original_price: 154999,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'Lenovo ThinkPad X1 Carbon Gen 11',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Business ultrabook with Intel Core i7, 14" 2.8K display, and legendary ThinkPad keyboard.',
        price: 159999,
        original_price: 169999,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        is_trending: false,
        is_out_of_stock: false
    },
    {
        name: 'ASUS ROG Zephyrus G14 (2024)',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Compact gaming laptop with AMD Ryzen 9, NVIDIA RTX 4060, and 14" QHD+ 165Hz display.',
        price: 149999,
        original_price: 159999,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        is_trending: true,
        is_out_of_stock: false
    },
    {
        name: 'MSI Katana 15',
        category: 'Laptops',
        section: 'Electronics',
        description: 'Budget gaming laptop with Intel Core i7, NVIDIA RTX 4050, and 15.6" 144Hz display.',
        price: 79999,
        original_price: 84999,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        is_trending: false,
        is_out_of_stock: false
    }
];

// ============================================
// MAIN SEEDING FUNCTION
// ============================================

async function seedTechProducts() {
    try {
        console.log('🚀 Starting tech products seeding...\n');

        // Step 1: Seed Categories (use insert instead of upsert to avoid conflict issues)
        console.log('📁 Creating tech categories...');
        const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .insert(techCategories);

        if (categoryError) {
            // It's okay if categories already exist
            if (categoryError.code === '23505') { // unique key violation
                console.log('ℹ️  Categories already exist, skipping...\n');
            } else {
                console.error('❌ Error creating categories:', categoryError.message);
            }
        } else {
            console.log(`✅ Created ${techCategories.length} categories\n`);
        }

        // Step 2: Combine all products
        const allTechProducts = [
            ...smartphones,
            ...smartwatches,
            ...earbuds,
            ...tablets,
            ...laptops
        ];

        console.log(`📦 Total products to insert: ${allTechProducts.length}`);
        console.log(`   - Smartphones: ${smartphones.length}`);
        console.log(`   - Smartwatches: ${smartwatches.length}`);
        console.log(`   - Earbuds & Headphones: ${earbuds.length}`);
        console.log(`   - Tablets: ${tablets.length}`);
        console.log(`   - Laptops: ${laptops.length}\n`);

        // Step 3: Seed Products in batches
        console.log('💾 Inserting products into database...');
        const batchSize = 20;
        let insertedCount = 0;

        for (let i = 0; i < allTechProducts.length; i += batchSize) {
            const batch = allTechProducts.slice(i, i + batchSize);
            const { error } = await supabase
                .from('products')
                .insert(batch);

            if (error) {
                console.error(`❌ Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error.message);
            } else {
                insertedCount += batch.length;
                console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} products)`);
            }
        }

        console.log(`\n🎉 Successfully inserted ${insertedCount} tech products!\n`);

        // Statistics
        const avgPrice = allTechProducts.reduce((sum, p) => sum + p.price, 0) / allTechProducts.length;
        const trendingCount = allTechProducts.filter(p => p.is_trending).length;
        const avgRating = allTechProducts.reduce((sum, p) => sum + p.rating, 0) / allTechProducts.length;

        console.log('📊 Product Statistics:');
        console.log(`   Average Price: ₹${Math.round(avgPrice)}`);
        console.log(`   Trending Products: ${trendingCount}`);
        console.log(`   Average Rating: ${avgRating.toFixed(2)} ⭐`);
        console.log(`   Price Range: ₹${Math.min(...allTechProducts.map(p => p.price))} - ₹${Math.max(...allTechProducts.map(p => p.price))}`);

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }
}

// Run the seeding
seedTechProducts().then(() => {
    console.log('\n✨ Tech products seeding complete!');
    process.exit(0);
});
