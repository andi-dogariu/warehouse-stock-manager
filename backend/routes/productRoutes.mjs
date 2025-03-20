// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController.mjs');
// const {body, validationResult} = require('express-validator')

import express from 'express';
import { body } from 'express-validator';
import * as  productController from '../controllers/productController.mjs';

const router = express.Router();

const validateProduct = [
  body('make').notEmpty().isString(),
  body('model').notEmpty().isString(),
  body('price').notEmpty().isNumeric(),
  body('stock').notEmpty().isInt()
];

// GET all products
router.get('/', productController.getProducts);

// GET product by ID
router.get('/:id', productController.getProductById);

// POST create product
router.post('/', validateProduct, productController.createProduct);

// PUT update product
router.put('/:id', validateProduct, productController.updateProduct);

// DELETE product
router.delete('/:id', productController.deleteProduct);

// module.exports = router;

export default router;
