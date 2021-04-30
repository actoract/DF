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

//@description GET all profiles
//@route GET /api/users
//@access for admin
const getAllProfiles = expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

//@description GET user by his ID
//@route GET /api/users/:id
//@access for admin
const getProfileById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id). select('-password') //pass without password
    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error('User not found')
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

//@description UPDATE user profile
//@route GET /api/users/profile
//@access Private
const updateProfile = expressAsyncHandler(async (req, res) => {
    const existUser = await User.findById(req.user._id)
    if(existUser){
        existUser.firstName = req.body.firstName || existUser.firstName
        existUser.lastName = req.body.lastName || existUser.lastName
        existUser.email = req.body.email || existUser.email
        if(req.body.password){
            existUser.password = req.body.password
        }
        const updatedUser = await existUser.save()
        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: tokenGeneration(updatedUser._id) //token Generation
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})


//@description UPDATE all users status
//@route GET /api/users/:id
//@access Private for admin
const updateProfileById = expressAsyncHandler(async (req, res) => {
    const existUser = await User.findById(req.params.id)
    if(existUser){
        existUser.firstName = existUser.firstName
        existUser.lastName = existUser.lastName
        existUser.email = existUser.email
        existUser.isAdmin = req.body.isAdmin
        const updatedUser = await existUser.save()
        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})
export {userAuth, getProfile, getAllProfiles, regUser, updateProfile, updateProfileById, getProfileById}
