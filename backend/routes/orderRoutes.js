import express from 'express'
import {addOrder} from '../controllers/orderController.js'
import {protect} from '../middleware/authicationMiddleware.js'
const router = express.Router()

//The route defines a callback that will be invoked whenever an HTTP POST request with the correct pattern is detected
router.route('/').post(protect, addOrder)


export default router