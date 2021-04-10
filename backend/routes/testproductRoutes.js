import express from 'express'
import {getTestProducts, getTestProductById} from '../controllers/testproductController.js'

const router = express.Router()

//@description Fetch ll products
//@route GET /api/testproducts
//@access Public
router.route('/').get(getTestProducts)

//@description Fetch single products
//@route GET /api/testproducts/:id
//@access Public
router.route('/:id').get(getTestProductById)

export default router