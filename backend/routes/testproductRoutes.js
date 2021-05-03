import express from 'express'
import {getTestProducts, createReviewTestProduct, getTestProductById, deleteTestProduct, updateTestProduct, createTestProduct} from '../controllers/testproductController.js'
import {protect, admin} from '../middleware/authicationMiddleware.js'

const router = express.Router()

//@description Fetch ll products
//@route GET /api/testproducts
//@access Public
router.route('/').get(getTestProducts)
.post(protect, admin, createTestProduct)

router.route('/:id/reviews').post(protect, createReviewTestProduct)

//@description Fetch single test products
//@route GET /api/testproducts/:id
//@access Public
router.route('/:id').get(getTestProductById)
.delete(protect, admin, deleteTestProduct)
.put(protect, admin, updateTestProduct)

export default router