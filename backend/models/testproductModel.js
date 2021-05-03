import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    rating: {type: Number, require: true},
    comment: {type: String, require: true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'User'
    },//all users
}, {
    timeStams: true
})

const testproductSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'User'
    },//admin
    name: {
        nameRus: {type: String, require: true},
        nameEng: {type: String, require: true},
    },
    image:{
        type: String,
        require:true
    },
    model:{
        type: String,
        require:true
    },
    reviews: [reviewSchema],
    rating:{
        type: Number,
        require: true,
        default: 0
    },
    ratingNum:{
        type: Number,
        require: true,
        default: 0
    },
    description:{
        care: {type: String, require: true},
        material: {type: String, require: true},
        color: {type: String, require: true},
    },
}, {
    timeStams: true
})

const TestProduct = mongoose.model('TestProduct', testproductSchema)
export default TestProduct