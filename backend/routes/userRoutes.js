import express from 'express'
import {userAuth, getProfile, regUser, updateProfile} from '../controllers/userController.js'
import {protect} from '../middleware/authicationMiddleware.js'
const router = express.Router()

router.post('/login', userAuth)
//router.route('/profile').get(protect, getProfile)
router.route('/profile').get(protect, getProfile).put(protect, updateProfile)
router.route('/').post(regUser)


export default router