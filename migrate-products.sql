-- =============================================
-- ATTIREX Product Migration SQL
-- Total Products: 37
-- All prices capped at ₹1500
-- =============================================

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('5fbaa48e-2c12-4e1a-a8e9-7f51a7f3e8c1', 'Blue Shirt', 'Casual', 'Mens', 3, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160993/E-comm%20ATTIREX/Mens-Fashion/istockphoto-1251683479-612x612_fl1ar5.jpg', false, 'White micro ditsy printed opaque Formal shirt, has a spread collar, button placket, 1 patch pocket, long regular sleeves, curved hem', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('e3ff4cc2-4c47-4daa-958c-6a5b3dc1a2e7', 'Black Jacket', 'Casual', 'Mens', 5, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160852/E-comm%20ATTIREX/Mens-Fashion/istockphoto-1439804198-612x612_upwx0z.jpg', true, 'A stylish black bomber jacket made from high-quality materials. It features a front zipper closure, ribbed cuffs and hem, and multiple pockets. Perfect for adding a cool and edgy touch to your casual outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('7d9c3b1b-1e0d-415b-9359-52937d47af2a', 'Henley Shirt', 'Casual', 'Mens', 5, 'men', 1000, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684231181/E-comm%20ATTIREX/Mens-Fashion/istockphoto-1327456615-612x612_n99hjx.jpg', false, 'A comfortable and casual Henley shirt made from soft cotton fabric. It features a round neckline with a partial button placket and long sleeves. Perfect for a relaxed yet stylish look.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('2f79f25e-0451-4985-bc03-af8d15b1714f', 'Cargo Shorts', 'Casual', 'Mens', 5, 'men', 1000, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684251162/E-comm%20ATTIREX/Mens-Fashion/pexels-photo-1306248_eegoas.jpg', false, 'Cargo shorts made from durable fabric with multiple pockets for added functionality. They have a relaxed fit, a mid-length cut, and a versatile design suitable for various casual occasions.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('5fbaa48e2c124e1aa8e97f51a7f3e8c1', 'Denim Jeans', 'Casual', 'Mens', 4, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160987/E-comm%20ATTIREX/Mens-Fashion/istockphoto-1220376914-612x612_qonriu.jpg', true, 'Blue washed mid-rise jeans, heavily distressed, has a button and zip closure, waistband with belt loops, five pockets, and cuffed hems', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('e3ff4cc24c474daa958c6a5b3dc1a2e7', 'White Shirt', 'Formal', 'Mens', 4.5, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160864/E-comm%20ATTIREX/Mens-Fashion/istockphoto-666965914-612x612_zywdue.jpg', false, 'White dress shirt with a classic fit and button-down collar.Perfect for adding a cool and edgy touch to your outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('7d9c3b1b1e0d415b935952937d47af2a', 'Dress Pants', 'Formal', 'Mens', 4.5, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684251395/E-comm%20ATTIREX/Mens-Fashion/istockphoto-1425659876-612x612_iethxn.jpg', false, 'Tailored dress pants in a versatile color such as black, navy, or charcoal gray. They feature a flat front, a straight leg cut, and a comfortable fit. Perfect for pairing with dress shirts and blazers for formal occasions.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('2f79f25e04514985bc03af8d15b1714f', 'Blue Suit', 'Formal', 'Mens', 5, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684230866/E-comm%20ATTIREX/Mens-Fashion/istockphoto-658846934-612x612_fkwpu2.jpg', false, 'Navy blue two-piece suit with a slim fit and notched lapels.Perfect for adding a cool and edgy touch to your formal outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('df68072f-72e1-43e6-9f6b-7eb4e9e1b10a', 'Black Tuxedo', 'Formal', 'Mens', 4.2, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684230938/E-comm%20ATTIREX/Mens-Fashion/istockphoto-155394131-612x612_lqdnjg.jpg', true, 'Classic black leather tuxedo with a polished finish.Perfect for adding a cool and edgy touch to your formal outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('b9cc7271-62af-4f25-8fb9-52f7a71cc10f', 'Grey Trousers', 'Formal', 'Mens', 4.8, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684231008/E-comm%20ATTIREX/Mens-Fashion/istockphoto-1345963025-612x612_ostie7.jpg', false, 'Charcoal grey trousers with a tailored fit and front pleats.Perfect for adding a cool and edgy touch to your formal outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('58b7644e-4d8a-4416-bc37-5d4e5e4a2e41', 'White T-shirt', 'Freestyle', 'Mens', 4.7, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684231299/E-comm%20ATTIREX/Mens-Fashion/pexels-photo-5753204_nei74i.webp', false, 'White t-shirt with a relaxed fit and crew neckline.Perfect for adding a cool and edgy touch to your casual outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('013e6e0e-5eef-4f4e-8fa9-2b7879e20a12', 'Distressed Jeans', 'Freestyle', 'Mens', 4.9, 'men', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684231488/E-comm%20ATTIREX/Mens-Fashion/pexels-photo-1129019_s4qgfw.webp', false, 'Ripped and distressed denim jeans with a slim fit and tapered leg.Perfect for adding a cool and edgy touch to your casual outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('e17417b2-1f4b-445a-85b2-32d9aeec6b7e', 'Sports Top', 'Active Wear', 'Womens', 4.5, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684156820/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1366038769-612x612_pa4c9e.jpg', false, 'High-impact sports top with moisture-wicking fabric and adjustable straps.Perfect for adding a cool and edgy touch to your workout outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('e1f17b2a-2f4b-455a-95b2-37d9aeec6b8f', 'Leggings', 'Active Wear', 'Womens', 4.8, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684232026/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1307931676-612x612_xvnuse.jpg', false, 'Stretchy and breathable leggings with a high-rise waist and mesh panels.Perfect for adding a cool and edgy touch to your workout outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('e1e17b2a-3f4b-465a-75b2-42d9aeec6b9g', 'Running Shorts', 'Active Wear', 'Womens', 4.6, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684231969/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1216112341-612x612_g0fann.jpg', false, 'Breathable and quick-drying running shorts with built-in briefs and a zippered pocket.Perfect for adding a cool and edgy touch to your workout outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('f55e5204-0a3c-4d10-985e-60cc1068fc81', 'Tank Top', 'Active Wear', 'Womens', 4.2, 'women', 1200, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684232244/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1329490444-612x612_sxpacm.jpg', true, 'Lightweight and loose-fitting tank top with a racerback design and moisture-wicking fabric.Perfect for adding a cool and edgy touch to your workout outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('ae1f4f9b-0d60-4e7a-83b5-2db6d7b99c29', 'Floral Dress', 'Dresses', 'Womens', 4.7, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684232697/E-comm%20ATTIREX/Womens-Fashion/pexels-photo-11772316_qj6ma3.webp', false, 'Flowy floral print maxi dress with a V-neckline and adjustable straps.Perfect for adding a cool and edgy touch to your vacation outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('67e3448c-5181-432d-9fbf-78218ac17162', 'Bodycon Dress', 'Dresses', 'Womens', 4.9, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684161231/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1417865925-612x612_hkynsy.jpg', false, 'Classic bodycon black dress with a fitted silhouette and short sleeves.Perfect for adding a cool and edgy touch to your party outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('2d2fb2f0-9e2a-4e18-aa94-cbfb1e61a471', 'Wrap Dress', 'Dresses', 'Womens', 4.6, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684232933/E-comm%20ATTIREX/Womens-Fashion/istockphoto-186829751-612x612_oa04tb.jpg', true, 'Versatile wrap dress with a tie closure and a flattering A-line silhouette.Perfect for adding a cool and edgy touch to your casual outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('e7b9a9d2-27b0-4e8e-b4f1-2de57f3ebc2f', 'Midi Sundress', 'Dresses', 'Womens', 4.3, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684233042/E-comm%20ATTIREX/Womens-Fashion/pexels-photo-14936437_syoc8o.jpg', false, 'Lightweight and breezy midi sundress with adjustable spaghetti straps.Perfect for adding a cool and edgy touch to your casual outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('7c6504f6-527f-4e06-96c0-428f77ae8b6f', 'Off-Shoulder Dress', 'Dresses', 'Womens', 4.8, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684233244/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1202807525-612x612_oknke7.jpg', false, 'Trendy off-shoulder dress with a ruffled neckline and a flared skirt.Perfect for adding a cool and edgy touch to your party outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('3e6fb414-0e7a-4223-98a1-1d56e69d83a3', 'Lace Cocktail Dress', 'Dresses', 'Womens', 4.5, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684233369/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1143043139-612x612_qi32jp.jpg', true, 'Elegant lace cocktail dress with a fitted bodice and a knee-length hemline.Perfect for adding a cool and edgy touch to your cocktail outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('2f297a9d-22ef-4d39-91b2-049ce2f198c0', 'Boho Print Dress', 'Dresses', 'Womens', 4.2, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684232576/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1210757774-612x612_afynjb.jpg', false, 'Bohemian-style print dress with long bell sleeves and a flowy silhouette.Perfect for adding a cool and edgy touch to your casual outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('1a426b0a-eb7e-4d4f-9ad7-9f2428bfc227', 'Tailored Blazer', 'Office Wear', 'Womens', 4.7, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160313/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1421800979-612x612_jhezda.jpg', false, 'Classic tailored blazer with a single-button closure and notched lapels.Perfect for adding a cool and edgy touch to your office outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('1d6b2a0b-4d9e-4789-8eac-7c159768b4e3', 'Pencil Skirt', 'Office Wear', 'Womens', 4.9, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684233869/E-comm%20ATTIREX/Womens-Fashion/istockphoto-503240626-612x612_a1puvy.jpg', false, 'Sleek and fitted pencil skirt with a back slit and a concealed zip closure.Perfect for adding a cool and edgy touch to your office outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('eb057b3f-2b6c-42c7-836b-3b5e550af8b3', 'Button-Up Shirt', 'Office Wear', 'Womens', 4.6, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684159867/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1400286718-612x612_ch35pz.jpg', true, 'Crisp button-up shirt with a pointed collar and long sleeves.Perfect for adding a cool and edgy touch to your office outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('fbf998fe-3e07-40a0-97b0-1d2165d1fb09', 'Wide-Leg Trousers', 'Office Wear', 'Womens', 4.8, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160321/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1421801076-612x612_yzh6co.jpg', false, 'Sophisticated wide-leg trousers with a high-rise waist and pleated details.Perfect for adding a cool and edgy touch to your office outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('a251a8e5-8ef8-41dd-a1c2-46e80b61499e', 'Denim Jacket', 'Casual', 'Womens', 4.5, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160521/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1142195614-612x612_qgxaym.jpg', false, 'Classic denim jacket with a button-front closure and front pockets.Perfect for adding a cool and edgy touch to your casual outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('0234936e-8c14-4d2c-bcc4-d7ff9c7f0db0', 'Graphic T-Shirt', 'Casual', 'Womens', 4.8, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684161396/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1166389425-612x612_je4nsg.jpg', false, 'Comfortable graphic t-shirt with a crew neck and short sleeves.Perfect for adding a cool and edgy touch to your casual outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('3842f512-b0ce-4c9c-8f48-4f9c9cc02f76', 'Jumpsuit', 'Casual', 'Womens', 4.2, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684161095/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1344271946-612x612_akkm5y.jpg', true, 'Trendy jumpsuit with a slim fit and ripped details.Perfect for adding a cool and edgy touch to your casual outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('9b3c5f17-d60b-4c35-a1f6-89283c4a019e', 'Striped Top', 'Tops', 'Womens', 4.7, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160594/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1097372032-612x612_al3xnl.jpg', false, 'Stylish striped top with a relaxed fit.Perfect for adding a cool and edgy touch to your casual outfits.Get your best deal.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('8a45f1b1-6d32-4e0e-9c9d-9632284a7d4c', 'Off-Shoulder Crop Top', 'Tops', 'Womens', 4.9, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684161112/E-comm%20ATTIREX/Womens-Fashion/istockphoto-1353609468-612x612_yiv7ax.jpg', false, 'Fashionable off-shoulder crop top with short sleeves and a smocked neckline.Perfect for adding a cool and edgy touch to your casual outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('ef5d8256-875d-4d5f-89a4-bfa5e97fc8b0', 'Ruffled Top', 'Tops', 'Womens', 4.6, 'women', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684234448/E-comm%20ATTIREX/Womens-Fashion/istockphoto-812874928-612x612_kpq1zl.jpg', true, 'Elegant ruffled top with off-shoulder and adjustable spaghetti straps.Perfect for adding a cool and edgy touch to your casual outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('e5db10b4-3b7c-40e9-a6ff-5c7d87b9c0af', 'Hoodie', 'Kids'' fashion', 'Kids', 4.5, 'kids', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684621708/E-comm%20ATTIREX/Kids-Fashion/hmgoepprod_zvhtpt.webp', false, 'Bright and vibrant hoodie for kids with a kangaroo pocket and a hood.Perfect for adding a cool and edgy touch to your kids outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('18a4d57e-6ac3-4468-bf5e-1a5e67b3df37', 'Printed T-Shirt', 'Kids'' fashion', 'Kids', 4.8, 'kids', 800, 1000, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160795/E-comm%20ATTIREX/Kids-Fashion/istockphoto-1356594834-612x612_p1ywwg.jpg', false, 'Fun and playful printed t-shirt for kids with short sleeves and a crew neck.Perfect for adding a cool and edgy touch to your kids outfits.', true);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('67e34f16-334b-4e96-8d24-6e1061f2c99d', 'Denim Overalls', 'Kids'' fashion', 'Kids', 4.6, 'kids', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160742/E-comm%20ATTIREX/Kids-Fashion/istockphoto-1296361252-612x612_rkq0ow.jpg', true, 'Stylish denim overalls for kids with adjustable straps and multiple pockets.Perfect for adding a cool and edgy touch to your kids outfits.', false);

INSERT INTO products (_id, name, category, section, rating, gender, price, original_price, image, is_out_of_stock, description, is_trending)
VALUES ('db727d27-d0e1-4164-b422-c03e97f82fa9', 'Striped Dress', 'Kids'' fashion', 'Kids', 4.2, 'kids', 1500, 1500, 'https://res.cloudinary.com/dptfwcnro/image/upload/v1684160787/E-comm%20ATTIREX/Kids-Fashion/istockphoto-1361311726-612x612_cnjg6c.jpg', false, 'Adorable striped dress for kids with a flared skirt and a bow accent.Perfect for adding a cool and edgy touch to your kids outfits.', false);
