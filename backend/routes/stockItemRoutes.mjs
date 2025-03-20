// const express = require('express');
// const router = express.Router();
// const stockItemController = require('../controllers/stockItemController.mjs');
// const {body, validationResult} = require('express-validator')

import express from 'express';
import { body } from 'express-validator';
import * as stockItemController from '../controllers/stockItemController.mjs';

const router = express.Router();

const validateStockItem = [
  body('productId').notEmpty().isInt(),
  body('location').notEmpty().isString()
];

// GET all stockItems
router.get('/', stockItemController.getStockItems);

// GET stockItem by ID
router.get('/:id', stockItemController.getStockItemById);

// POST create stockItem
router.post('/', validateStockItem, stockItemController.createStockItem);

// PUT update stockItem
router.put('/:id', validateStockItem, stockItemController.updateStockItem);

// DELETE stockItem
router.delete('/:id', stockItemController.deleteStockItem);

// module.exports = router;

export default router;
