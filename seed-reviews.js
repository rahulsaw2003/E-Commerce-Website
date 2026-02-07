// Seed Reviews Script - Generate fake reviews for all products
// Run with: node seed-reviews.js

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Realistic review templates by rating
const reviewTemplates = {
    5: [
        "Absolutely love this! The quality is outstanding and it fits perfectly. Highly recommend!",
        "Best purchase I've made in a long time! The fabric is premium and the design is exactly as shown.",
        "Amazing product! Exceeded my expectations in every way. Will definitely buy again.",
        "Perfect fit and excellent quality! The color is vibrant and the material feels great.",
        "Outstanding quality for the price. Very satisfied with this purchase!",
        "Superb product! The attention to detail is impressive. 5 stars all the way!",
        "This is exactly what I was looking for! Great quality and fast delivery too.",
        "Incredible value! The quality rivals much more expensive brands.",
        "Love everything about this! The fit, fabric, and finish are all top-notch.",
        "Couldn't be happier with this purchase! Looks even better in person."
    ],
    4: [
        "Really nice product! Just wish it came in more colors. Otherwise, very satisfied.",
        "Good quality overall. Fits well but the delivery took a bit longer than expected.",
        "Great purchase! The material is good, though sizing runs slightly small.",
        "Very happy with this! Only minor issue is the stitching could be better in some areas.",
        "Solid product for the price. Would recommend, just size up if you're in between sizes.",
        "Nice quality and good fit. Lost one star because of the packaging, but the product itself is great!",
        "Pretty good overall! The color is slightly different from the picture but still nice.",
        "Good value for money. The material is comfortable but could be a bit thicker.",
        "Happy with my purchase! Just a tiny bit of color fade after washing, but still looks good.",
        "Decent quality. Fits as expected and looks nice. Would buy again."
    ],
    3: [
        "It's okay. The quality is decent but nothing exceptional. Average product.",
        "Not bad, but not great either. Fits okay but the material feels a bit cheap.",
        "Mixed feelings about this. The design is nice but the quality could be better.",
        "Average product. Does the job but I expected a bit more for the price.",
        "It's alright. The fit is okay but the color faded after first wash.",
        "Decent but wouldn't say it's worth the full price. Wait for a sale.",
        "The product is fine, but sizing is inconsistent. Had to exchange once.",
        "Okay quality. The material is thinner than I expected but still wearable.",
        "Not terrible but not amazing either. It works for the price I guess.",
        "Middle of the road product. Nothing special but gets the job done."
    ],
    2: [
        "Disappointed with the quality. The material feels cheap and the fit is off.",
        "Not what I expected. The product looks different from the pictures and feels low quality.",
        "Pretty disappointing. The stitching came undone after just a few wears.",
        "Below average quality. Sizing is way off and the fabric is rough.",
        "Not happy with this purchase. The color faded significantly after one wash.",
        "Expected better quality. The fit is poor and material feels synthetic.",
        "Wouldn't recommend. The product arrived damaged and quality is subpar.",
        "Disappointed. The description doesn't match the actual product at all.",
        "Poor quality for the price. Already showing signs of wear after minimal use.",
        "Not worth it. The material is uncomfortable and the fit is terrible."
    ],
    1: [
        "Terrible quality! Completely different from what was advertised. Total waste of money.",
        "Very disappointed. The product fell apart after one use. Do not buy!",
        "Worst purchase ever. Cheap material, horrible fit, and terrible customer service.",
        "Absolutely awful! Nothing like the description. Requesting a full refund.",
        "Don't waste your money! The quality is abysmal and it's clearly a knockoff.",
        "Horrible product! Arrived damaged and the material is scratchy and uncomfortable.",
        "Extremely poor quality. Would give zero stars if I could. Avoid at all costs!",
        "Total garbage! Completely fell apart in the wash. Save your money!",
        "Terrible! The sizing is completely wrong and the fabric is paper thin.",
        "Awful product. False advertising and the worst quality I've ever seen."
    ]
};

// Fake user names and emails
const users = [
    { name: "Priya Sharma", email: "priya.sharma@gmail.com" },
    { name: "Rahul Verma", email: "rahul.v123@gmail.com" },
    { name: "Anjali Patel", email: "anjali.patel@yahoo.com" },
    { name: "Vikram Singh", email: "vikram.singh@outlook.com" },
    { name: "Sneha Reddy", email: "sneha.reddy@gmail.com" },
    { name: "Arjun Mehta", email: "arjun.mehta45@gmail.com" },
    { name: "Kavya Iyer", email: "kavya.iyer@hotmail.com" },
    { name: "Rohan Gupta", email: "rohan.g@gmail.com" },
    { name: "Diya Nair", email: "diya.nair22@gmail.com" },
    { name: "Aditya Kumar", email: "aditya.kumar@gmail.com" },
    { name: "Ishita Desai", email: "ishita.d@yahoo.com" },
    { name: "Karan Malhotra", email: "karan.malhotra@gmail.com" },
    { name: "Meera Joshi", email: "meera.joshi@outlook.com" },
    { name: "Siddharth Rao", email: "sid.rao91@gmail.com" },
    { name: "Pooja Chopra", email: "pooja.chopra@gmail.com" },
    { name: "Nikhil Bansal", email: "nikhil.b@gmail.com" },
    { name: "Riya Agarwal", email: "riya.agarwal@yahoo.com" },
    { name: "Aman Sinha", email: "aman.sinha@gmail.com" },
    { name: "Tanvi Kapoor", email: "tanvi.kapoor@hotmail.com" },
    { name: "Varun Saxena", email: "varun.s@gmail.com" }
];

// Generate random date within last 90 days
function getRandomDate() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    return date.toISOString();
}

// Generate random rating with weighted distribution (more positive reviews)
function getRandomRating() {
    const random = Math.random();
    if (random < 0.50) return 5; // 50% 5-star
    if (random < 0.75) return 4; // 25% 4-star
    if (random < 0.88) return 3; // 13% 3-star
    if (random < 0.96) return 2; // 8% 2-star
    return 1; // 4% 1-star
}

// Get random comment for rating
function getRandomComment(rating) {
    const templates = reviewTemplates[rating];
    return templates[Math.floor(Math.random() * templates.length)];
}

// Get random user
function getRandomUser() {
    return users[Math.floor(Math.random() * users.length)];
}

// Get random status (mostly approved)
function getRandomStatus() {
    const random = Math.random();
    if (random < 0.85) return 'approved'; // 85% approved
    if (random < 0.95) return 'pending';  // 10% pending
    return 'rejected'; // 5% rejected
}

// Generate reviews for a product
function generateReviewsForProduct(productId) {
    const numReviews = Math.floor(Math.random() * 4) + 3; // 3-6 reviews per product
    const reviews = [];
    const usedUsers = new Set();

    for (let i = 0; i < numReviews; i++) {
        // Get unique user for this product
        let user;
        do {
            user = getRandomUser();
        } while (usedUsers.has(user.email) && usedUsers.size < users.length);
        usedUsers.add(user.email);

        const rating = getRandomRating();
        const review = {
            product_id: productId,
            user_email: user.email,
            rating: rating,
            comment: getRandomComment(rating),
            status: getRandomStatus(),
            created_at: getRandomDate()
        };
        reviews.push(review);
    }

    return reviews;
}

// Main function
async function seedReviews() {
    try {
        console.log('🌱 Starting reviews seeding process...\n');

        // Fetch all products
        console.log('📦 Fetching products from database...');
        const { data: products, error: fetchError } = await supabase
            .from('products')
            .select('_id, name');

        if (fetchError) {
            throw new Error(`Failed to fetch products: ${fetchError.message}`);
        }

        if (!products || products.length === 0) {
            console.log('⚠️  No products found in database!');
            return;
        }

        console.log(`✅ Found ${products.length} products\n`);

        // Generate reviews for all products
        const allReviews = [];
        for (const product of products) {
            const productReviews = generateReviewsForProduct(product._id);
            allReviews.push(...productReviews);
            console.log(`📝 Generated ${productReviews.length} reviews for: ${product.name}`);
        }

        console.log(`\n✨ Total reviews generated: ${allReviews.length}\n`);

        // Insert reviews in batches (Supabase has limits)
        console.log('💾 Inserting reviews into database...');
        const batchSize = 50;
        let insertedCount = 0;

        for (let i = 0; i < allReviews.length; i += batchSize) {
            const batch = allReviews.slice(i, i + batchSize);
            const { data, error } = await supabase
                .from('reviews')
                .insert(batch);

            if (error) {
                console.error(`❌ Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error.message);
            } else {
                insertedCount += batch.length;
                console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} reviews)`);
            }
        }

        console.log(`\n🎉 Success! Inserted ${insertedCount} reviews into the database!`);

        // Show statistics
        const stats = {
            5: allReviews.filter(r => r.rating === 5).length,
            4: allReviews.filter(r => r.rating === 4).length,
            3: allReviews.filter(r => r.rating === 3).length,
            2: allReviews.filter(r => r.rating === 2).length,
            1: allReviews.filter(r => r.rating === 1).length,
            approved: allReviews.filter(r => r.status === 'approved').length,
            pending: allReviews.filter(r => r.status === 'pending').length,
            rejected: allReviews.filter(r => r.status === 'rejected').length
        };

        console.log('\n📊 Review Statistics:');
        console.log(`   ⭐⭐⭐⭐⭐ (5 stars): ${stats[5]}`);
        console.log(`   ⭐⭐⭐⭐ (4 stars): ${stats[4]}`);
        console.log(`   ⭐⭐⭐ (3 stars): ${stats[3]}`);
        console.log(`   ⭐⭐ (2 stars): ${stats[2]}`);
        console.log(`   ⭐ (1 star): ${stats[1]}`);
        console.log(`\n   ✅ Approved: ${stats.approved}`);
        console.log(`   ⏳ Pending: ${stats.pending}`);
        console.log(`   ❌ Rejected: ${stats.rejected}`);

        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        console.log(`\n   📈 Average Rating: ${avgRating.toFixed(2)} ⭐`);

    } catch (error) {
        console.error('❌ Error seeding reviews:', error.message);
        process.exit(1);
    }
}

// Run the script
seedReviews().then(() => {
    console.log('\n✨ Seeding complete!');
    process.exit(0);
});
