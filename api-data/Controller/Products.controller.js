const query = require('../Model/query');

// Fetch all products
async function getAllProducts(req, res ) {
    try {
        const results = await query.executeQuery('SELECT * FROM products');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Fetch a product by ID
async function getProductById(req, res) {
  const productId = req.params.id; // assuming it's the SKU, not numeric id

  try {
    const sql = `
      SELECT 
        p.id,  
       
        b.name AS brand,
        
        c.name AS category, 
        p.name, 
        p.description, 
        p.color, 
        p.size,
        p.gender, 
        p.price, 
        p.sku, 
        p.discount_price, 
        p.stock_quantity, 
        p.imageUrls 
      FROM products AS p 
      JOIN brands AS b ON p.brand_id = b.id 
      JOIN categories AS c ON p.category_id = c.id 
      WHERE p.sku = ?
    `;

    const results = await query.executeQuery(sql, [productId]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// paginations
async function getProductsByPage(req, res ) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const [totalResults] = await query.executeQuery('SELECT COUNT(*) as count FROM products');

     // Filters
    const {
      brand,
      category,
      gender,
      min_price,
      max_price,
      sort
    } = req.query;

    // Base query + joins for readability
    let baseQuery = `
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      WHERE 1 = 1
    `;

    const params = [];

    // Add filters dynamically
    if (brand) {
      baseQuery += " AND b.name = ?";
      params.push(brand);
    }

    if (category) {
      baseQuery += " AND c.name = ?";
      params.push(category);
    }

    if (gender) {
      baseQuery += " AND p.gender = ?";
      params.push(gender);
    }

    if (min_price) {
      baseQuery += " AND p.price >= ?";
      params.push(parseFloat(min_price));
    }

    if (max_price) {
      baseQuery += " AND p.price <= ?";
      params.push(parseFloat(max_price));
    }

    // Sorting
    let orderBy = "p.created_at DESC"; // default sort: newest first
    if (sort) {
      if (sort === "price_asc") orderBy = "p.price ASC";
      else if (sort === "price_desc") orderBy = "p.price DESC";
      else if (sort === "latest") orderBy = "p.created_at DESC";
      else if (sort === "oldest") orderBy = "p.created_at ASC";
    }


    try {
        const results = await query.executeQuery(
            `
            SELECT 
            p.id, p.name, p.price, p.description, p.feature, p.sku, p.discount_price, p.color, p.size,
            p.gender, p.stock_quantity,  p.imageUrls,
            b.name AS brand, c.name AS category
            ${baseQuery} ORDER BY ${orderBy} LIMIT ? OFFSET ?
            `, [...params, limit, offset]);
        res.status(200).json({
            current_page: page,
            total_pages: Math.ceil(totalResults.count / limit),
            total_results: totalResults.count,
            filters: { brand, category, gender, min_price, max_price, sort },
            results});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Generate a sku from name
function generateSku(name) {
   let sku = name.trim().toUpperCase().replace(/\s+/g, '-');
   sku += '-' + Math.floor(1000 + Math.random() * 9000);
   return sku;
}

function generateSlug(name) {
    return name.toLowerCase().replace(/\s+/g, '-') + '-' +  Math.floor(1000 + Math.random() * 9000);
}


async function postProduct(req, res ) {
    const {
      name, brand_id, category_id,  
      description, material, color, gender, size, price, discount_price, 
      stock_quantity
    } = req.body;

    

    const imgFiles = req.files; // Assuming images are sent as multipart/form-data
    try {
        const imageUrls = imgFiles ? imgFiles.map(file => `/uploads/${file.filename}`) : [];
        console.log('Uploaded image URLs:', JSON.stringify(imageUrls));
        // Validate product data
        if (!name || !brand_id || !category_id || price == null || stock_quantity == null) {
        throw new Error('Missing required fields');
        }
        if (isNaN(price) || isNaN(stock_quantity)) {
            throw new Error('Price and stock_quantity must be numbers');
        }

        let sku = generateSku(name);
        
       
        const result = await query.executeQuery(
            `INSERT INTO products (name, brand_id, category_id, sku, description, material, color,
            gender, size, price, discount_price, stock_quantity, imageUrls 
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name, 
                brand_id, 
                category_id, 
                sku, 
                description, 
                material || null, 
                color, 
                gender, 
                size, 
                price, 
                discount_price, 
                stock_quantity,
                JSON.stringify(imageUrls) 
                
            ]
        );
        const newProduct = await query.executeQuery('SELECT * FROM products WHERE id = ?', [result.insertId]);
        res.status(201).json(newProduct[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//function to validate product data
async function validateProductData(data) {
    const { name, brand_id, category_id, price, stock_quantity } = data;
    if (!name || !brand_id || !category_id || price == null || stock_quantity == null) {
        throw new Error('Missing required fields');
    }
    if (isNaN(price) || isNaN(stock_quantity)) {
        throw new Error('Price and stock_quantity must be numbers');
    }
}

// Function to save images to the server
async function saveImages(images) {
  
}

// async function saveImagesToVercel(images: File[]) {
//   const uploadedUrls: string[] = [];

//   for (const image of images) {
//     // Upload to Vercel Blob
//     const blob = await put(image.name, image, {
//       access: "public",          // public URL
//       addRandomSuffix: true,     // avoids overwriting files
//     });

//     uploadedUrls.push(blob.url); // Store the URL (save in DB later)
//   }

//   return uploadedUrls;
// }

module.exports = { getAllProducts, getProductById, getProductsByPage, postProduct };
