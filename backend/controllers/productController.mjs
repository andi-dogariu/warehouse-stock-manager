import Product from '../models/product.mjs';
import { validationResult } from 'express-validator';
import pool from '../db.mjs';

// Get all products
export const getProducts = (req, res) => {
  pool.query('SELECT * FROM products', (error, results, fields) => {
    if (error) {
      console.error('Error getting products:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
};

// Get product by ID
export const getProductById = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM products WHERE id = ?', [id], (error, results, fields) => {
    if (error) {
      console.error('Error getting product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(results[0]);
  });
};

// Create product
export const createProduct = (req, res) => {
  const { make, model, price, stock } = req.body;
  pool.query('INSERT INTO products (make, model, price, stock) VALUES (?, ?, ?, ?)', [make, model, price, stock], (error, results, fields) => {
    if (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ id: results.insertId, make, model, price, stock });
  });
};

// Update product
export const updateProduct = (req, res) => {
  const id = req.params.id;
  const { make, model, price, stock } = req.body;
  pool.query('UPDATE products SET make = ?, model = ?, price = ?, stock = ? WHERE id = ?', [make, model, price, stock, id], (error, results, fields) => {
    if (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ id, make, model, price, stock });
  });
};

// Delete product
export const deleteProduct = (req, res) => {
  const id = req.params.id;
  //delete all related stock items and then delete the product
  pool.query('DELETE FROM stockitems WHERE productid = ?', [id], (error, results, fields) => {
    if (error) {
      console.error('Error deleting stock:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    pool.query('DELETE FROM products WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json( { id } );
    });
  });
};
