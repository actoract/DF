import express from 'express'
import {userAuth, getProfile} from '../controllers/userController.js'
import {protect} from '../middleware/authicationMiddleware.js'
const router = express.Router()

router.post('/login', userAuth)
router.route('/profile').get(protect, getProfile)


export default router