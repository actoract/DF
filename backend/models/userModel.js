import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        require:true
    },    
    lastName:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique: true
    },
    password:{
        type: String,
        require:true
    },
    isAdmin:{
        type: Boolean,
        require:true,
        default: false
    }
}, {
    timeStams: true
})
userSchema.methods.matchPass = async function (userPass){ //Method to authenticate user
    return await bcrypt.compare(userPass, this.password)
}
const User = mongoose.model('User', userSchema)
export default User