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
export {userAuth, getProfile}
