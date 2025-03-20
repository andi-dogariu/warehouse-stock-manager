// const Product = require('../models/product.mjs');
import StockItem from '../models/stockItem.mjs';
import pool from '../db.mjs';

// Get all stockItems
export const getStockItems = (req, res) => {
  pool.query('SELECT * FROM stockitems', (error, results, fields) => {
    if (error) {
      console.error('Error getting stockItems:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
};

// Get product by ID
export const getStockItemById = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM stockitems WHERE id = ?', [id], (error, results, fields) => {
    if (error) {
      console.error('Error getting stockItem:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'StockItem not found' });
    }
    res.json(results[0]);
  });
};

// Create product
export const createStockItem = (req, res) => {
  const { productId, location } = req.body;
  pool.query('INSERT INTO stockitems (productId, location) VALUES (?, ?)', [productId, location], (error, results, fields) => {
    if (error) {
      console.error('Error creating stockItem:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ id: results.insertId, productId, location});
  });
};

// Update product
export const updateStockItem = (req, res) => {
  const id = req.params.id;
  const { productId, location } = req.body;
  pool.query('UPDATE stockitems SET productId = ?, location = ? WHERE id = ?', [productId, location, id], (error, results, fields) => {
    if (error) {
      console.error('Error updating stockItem:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({id, productId, location});
  });
};

// Delete product
export const deleteStockItem = (req, res) => {
  const id = req.params.id;
  //delete stockItem from database
  pool.query('DELETE FROM stockitems WHERE id = ?', [id], (error, results, fields) => {
    if (error) {
      console.error('Error deleting stockItem:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ id });
  });
};

export const getMakeByProductId = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT make FROM products WHERE id = ?', [id], (error, results, fields) => {
    if (error) {
      console.error('Error getting make:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(results[0]);
  });
}
