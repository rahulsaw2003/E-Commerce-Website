/**
 * Product Migration Script
 * Migrates products from products.js to Supabase database
 * All prices are capped at 1500
 */

const { createClient } = require('@supabase/supabase-js');
const { products } = require('./src/backend/db/products.js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Supabase credentials not found in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateProducts() {
    console.log('🚀 Starting product migration...\n');

    // Process products and cap prices at 1500
    const processedProducts = products.map(product => {
        const cappedPrice = Math.min(product.price, 1500);
        const cappedOriginalPrice = Math.min(product.originalPrice, 1500);

        return {
            _id: product._id,
            name: product.name,
            category: product.category,
            section: product.section,
            rating: product.rating,
            gender: product.gender,
            price: cappedPrice,
            original_price: cappedOriginalPrice, // Note: snake_case for database
            image: product.image,
            is_out_of_stock: product.isOutOfStock, // Note: snake_case for database
            description: product.description,
            is_trending: product.isTrending, // Note: snake_case for database
        };
    });

    console.log(`📦 Processing ${processedProducts.length} products...`);
    console.log(`💰 Prices capped at ₹1500\n`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Insert products one by one to handle errors gracefully
    for (const product of processedProducts) {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([product])
                .select();

            if (error) {
                errorCount++;
                errors.push({ product: product.name, error: error.message });
                console.log(`❌ Failed: ${product.name} - ${error.message}`);
            } else {
                successCount++;
                console.log(`✅ Migrated: ${product.name} (₹${product.price})`);
            }
        } catch (err) {
            errorCount++;
            errors.push({ product: product.name, error: err.message });
            console.log(`❌ Failed: ${product.name} - ${err.message}`);
        }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary');
    console.log('='.repeat(50));
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📦 Total: ${processedProducts.length}`);

    if (errors.length > 0) {
        console.log('\n⚠️  Errors:');
        errors.forEach(({ product, error }) => {
            console.log(`   - ${product}: ${error}`);
        });
    }

    console.log('\n✨ Migration completed!\n');
}

// Run migration
migrateProducts().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
});
