import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {type: String, require: true},
    rating: {type: Number, require: true},
    comment: {type: String, require: true}
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
    review: [reviewSchema],
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