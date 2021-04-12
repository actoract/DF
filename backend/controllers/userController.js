import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import tokenGeneration from '../utils/tokenGeneration.js'

//@description Use authication & get token
//@route POST /api/users/login
//@access Public
const userAuth = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body
    const existUser = await User.findOne({email})
    if (existUser && (await existUser.matchPass(password))){ //Validation
        res.json({
            _id: existUser._id,
            firstName: existUser.firstName,
            lastName: existUser.lastName,
            email: existUser.email,
            isAdmin: existUser.isAdmin,
            token: tokenGeneration(existUser._id) //token Generation
        })
    }
    else{
        res.status(401)
        throw new Error ('Invalid email or password')
    }
})

//@description GET user profile
//@route GET /api/users/profile
//@access Pкшмфеу
const getProfile = expressAsyncHandler(async (req, res) => {
    const existUser = await User.findById(req.user._id)
    if(existUser){
        res.json({
            _id: existUser._id,
            firstName: existUser.firstName,
            lastName: existUser.lastName,
            email: existUser.email,
            isAdmin: existUser.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})

//@description Registration
//@route POST /api/users
//@access Public
const regUser = expressAsyncHandler(async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    const existUser = await User.findOne({email})
    if(existUser){
        res.status(400)
        throw new Error('User already exist')
    }
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})
export {userAuth, getProfile, regUser}
