import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'User'
    },//who create product
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
    price:{
        priceReal: {type: Number, require: true},
        priceDigital: {type: Number, require: true}
    },
    description:{
        care: {type: String, require: true},
        material: {type: String, require: true},
        color: {type: String, require: true},
    },
    sizeStatus:[{
        size: {type: Number, require: true},
        countInStock: {type: Number, require: true, default: 0}
    }],

}, {
    timeStams: true
})

const Product = mongoose.model('Product', productSchema)
export default Product