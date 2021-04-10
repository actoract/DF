import express from 'express'
import {getProducts, getProductById} from '../controllers/productController.js'

const router = express.Router()

//@description Fetch ll products
//@route GET /api/products
//@access Public
router.route('/').get(getProducts)

//@description Fetch single products
//@route GET /api/products/:id
//@access Public
router.route('/:id').get(getProductById)

export default router