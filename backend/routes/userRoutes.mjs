// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController.mjs');
// const {body, validationResult} = require('express-validator')

import express from 'express';
import { body } from 'express-validator';
import * as userController from "../controllers/userController.mjs";

const router = express.Router();

const validateUser = [
  body('username').notEmpty().isString(),
  body('password').notEmpty().isString(),
  body('email').notEmpty().isEmail()
];

//POST Sign Up
router.post('/signup', validateUser, userController.signup);

//POST Log In
router.post('/login', userController.login);

//GET Private Details
router.get('/user-details', userController.getUserDetails);

// module.exports = router;

export default router;
