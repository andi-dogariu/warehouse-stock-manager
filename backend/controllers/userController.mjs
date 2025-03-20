import User from '../models/user.mjs';
import { validationResult } from 'express-validator';
import pool from '../db.mjs';
import jwt from "jsonwebtoken";

const SECRET_KEY = 'secret'

//signup
export const signup = (req, res) => {
  const {email, username, password } = req.body;

  console.log(req.body);

  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    pool.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, password, email], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Database insertion error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
  });
}

//login
export const login = (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
    if (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    //generate a jwt token and send it to the client
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  });
}

//get user details
export const getUserDetails = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('Unauthorized');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log('Token:',token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    pool.query('SELECT username, email FROM users WHERE username = ?', [decoded.username], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(results[0]);
      console.log(results[0]);
    });
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

