import express from 'express';
import mysql from 'mysql';
import productRoutes from './routes/productRoutes.mjs';
import stockItemRoutes from './routes/stockItemRoutes.mjs';
import { faker } from '@faker-js/faker';
import WebSocket, { WebSocketServer } from "ws";
import cors from 'cors';
import pool from './db.mjs';
import userRoutes from "./routes/userRoutes.mjs";

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'MPP'
};

//reset database
initializeDatabase();

function initializeDatabase() {
  const connection = mysql.createConnection(dbConfig);
  connection.connect();
  connection.query('DELETE FROM stockitems;', (error, results, fields) => {
    if (error) {
      console.error('Error resetting stock items:', error);
    }
  });
  connection.query('DELETE FROM products;', (error, results, fields) => {
    if (error) {
      console.error('Error resetting products:', error);
    }
  });
  //reset auto increment
  connection.query('ALTER TABLE stockitems AUTO_INCREMENT = 1;', (error, results, fields) => {
    if (error) {
      console.error('Error resetting auto increment:', error);
    }
  });
  connection.query('ALTER TABLE products AUTO_INCREMENT = 1;', (error, results, fields) => {
    if (error) {
      console.error('Error resetting auto increment:', error);
    }
  });
  const products = [
    { make: 'Apple', model: 'MacBook Pro', price: 1299.99, stock: 10 },
    { make: 'Dell', model: 'XPS 13', price: 1099.99, stock: 20 },
    { make: 'HP', model: 'Spectre x360', price: 1349.99, stock: 15 },
    { make: 'Lenovo', model: 'ThinkPad X1 Carbon', price: 1499.99, stock: 5 },
    { make: 'Microsoft', model: 'Surface Laptop 3', price: 999.99, stock: 25 }
  ];

  products.forEach(product => {
    connection.query('INSERT INTO products (make, model, price, stock) VALUES (?, ?, ?, ?)', [product.make, product.model, product.price, product.stock], (error, results, fields) => {
      if (error) {
        console.error('Error inserting product:', error);
      }
    });
  });

  const stockItems = [
    { productId: 1, location: 'A1' },
    { productId: 1, location: 'A2' },
    { productId: 2, location: 'B1' },
    { productId: 2, location: 'B2' },
    { productId: 3, location: 'C1' },
    { productId: 3, location: 'C2' },
    { productId: 4, location: 'D1' },
    { productId: 4, location: 'D2' },
    { productId: 5, location: 'E1' },
    { productId: 5, location: 'E2' }
  ];

  stockItems.forEach(stockItem => {
    connection.query('INSERT INTO stockitems (productId, location) VALUES (?, ?)', [stockItem.productId, stockItem.location], (error, results, fields) => {
      if (error) {
        console.error('Error inserting stock item:', error);
      }
    });
  });
}

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  //Send a new faker product every 20 seconds
  // const interval = setInterval(() => {
  //   ws.send(JSON.stringify(generateProduct()));
  // }, 10000);
});

function generateProduct() {
  const product = {
    id: app.locals.products.length + 1,
    make: faker.company.name(),
    model: faker.commerce.productName(),
    price: faker.commerce.price({ min: 500, max: 2000, dec: 2 }),
    stock: faker.number.int({ min: 1, max: 100 })
  };
  app.locals.products.push(product);
  console.log('Generated:', product);
  return product;
}

//generate 5 laptops using faker
const fakerProducts = [];
for (let i = 1; i <= 5; i++) {
  const product = {
    id: i + 1,
    make: faker.company.name(),
    model: faker.commerce.productName(),
    price: faker.commerce.price({ min: 500, max: 2000, dec: 2 }),
    stock: faker.number.int({ min: 1, max: 100 })
  };
  fakerProducts.push(product);
}

function loadProductsFromDatabase() {
  let products = [];
  pool.query('SELECT * FROM products', (error, results, fields) => {
    if (error) {
      console.error('Error getting products:', error);
      return;
    }
    products = results;
  });
  return products;
}

//Load initial products data
const initialProducts = loadProductsFromDatabase();

//Store products data in app locals
app.locals.products = initialProducts;

// Use product routes
app.use('/api/products', productRoutes);
app.use('/api/stockItems', stockItemRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
