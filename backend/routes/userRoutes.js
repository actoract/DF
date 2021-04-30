import express from 'express'
import {userAuth, getProfile, regUser, updateProfile, getAllProfiles, getProfileById, updateProfileById} from '../controllers/userController.js'
import {protect, admin} from '../middleware/authicationMiddleware.js'
const router = express.Router()

//The route defines a callback that will be invoked whenever an HTTP POST request with the correct pattern is detected
router.route('/').post(regUser).get(protect, admin, getAllProfiles)
router.post('/login', userAuth)
//router.route('/profile').get(protect, getProfile)
router.route('/profile')
.get(protect, getProfile).put(protect, updateProfile)

router.route('/:id')
.get(protect, admin, getProfileById)
.put(protect, admin, updateProfileById)


export default router