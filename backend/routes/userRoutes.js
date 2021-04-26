import express from 'express'
import {userAuth, getProfile, regUser, updateProfile} from '../controllers/userController.js'
import {protect} from '../middleware/authicationMiddleware.js'
const router = express.Router()

//The route defines a callback that will be invoked whenever an HTTP POST request with the correct pattern is detected
router.post('/login', userAuth)
//router.route('/profile').get(protect, getProfile)
router.route('/profile').get(protect, getProfile).put(protect, updateProfile)
router.route('/').post(regUser)


export default router