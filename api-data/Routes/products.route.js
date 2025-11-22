const express = require('express');

const router = express.Router();
const { getProductById, getProductsByPage, postProduct } = require('../Controller/Products.controller');
const {upload, multerErrorHandler} = require('../middleware');

// Route to fetch all products with pagination and filters
router.get('/', getProductsByPage);
// Post route to create a new product
router.post('/', upload.array("files"), multerErrorHandler, postProduct);
// Route to fetch a product by ID
router.get('/:id', getProductById);




module.exports = router;