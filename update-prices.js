import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate random price between 500 and 1500
function getRandomPrice() {
    return Math.floor(Math.random() * (1500 - 500 + 1) + 500);
}

async function updateProductPrices() {
    try {
        console.log('Fetching all products...');

        // Get all products
        const { data: products, error: fetchError } = await supabase
            .from('products')
            .select('_id, name, price');

        if (fetchError) {
            console.error('Error fetching products:', fetchError);
            return;
        }

        console.log(`Found ${products.length} products`);
        console.log('Updating prices...\n');

        // Update each product with a random price
        for (const product of products) {
            const newPrice = getRandomPrice();

            const { error: updateError } = await supabase
                .from('products')
                .update({ price: newPrice })
                .eq('_id', product._id);

            if (updateError) {
                console.error(`Error updating ${product.name}:`, updateError);
            } else {
                console.log(`✓ ${product.name}: ₹${product.price} → ₹${newPrice}`);
            }
        }

        console.log('\n✨ All product prices updated successfully!');

    } catch (error) {
        console.error('Error:', error);
    }
}

updateProductPrices();
