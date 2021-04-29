import express from 'express'
import {userAuth, getProfile, regUser, updateProfile, getAllProfiles} from '../controllers/userController.js'
import {protect, isAdmin} from '../middleware/authicationMiddleware.js'
const router = express.Router()

//The route defines a callback that will be invoked whenever an HTTP POST request with the correct pattern is detected
router.route('/').post(regUser).get(protect, isAdmin, getAllProfiles)
router.post('/login', userAuth)
//router.route('/profile').get(protect, getProfile)
router.route('/profile').get(protect, getProfile).put(protect, updateProfile)


export default router