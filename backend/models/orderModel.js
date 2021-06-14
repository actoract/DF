import mongoose from 'mongoose'


const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'User'
    },
    orderItems: [{
        id: {type: Number, require: true},
        name: {
            nameRus: {type: String, require: true},
            nameEng: {type: String, require: true},
        },
        qty: {type: Number, require: true},
        size: {type: String, require: true},
        type: {type: String, require: true},
        image: {type: String, require: true},
        price: {type: Number, require: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Product'
        },
        custImage: {type: String},
    }],
    deliveryAddress:{
        address: {type: String},
        city: {type: String},
        postCode: {type: String},
        country: {type: String},
        email: {type: String},
    },    
    email:{
        type: String,
        require:true,
        ref: 'User'
    },
    paymentMethod:{
        type: String,
        require:true
    },
    paymentResult:{
        id: {type: String},
        status: {type: String},
        updateTime: {type: String},
        email_address: {type: String},
    },
    totalPrice:{
        type: Number,
        require:true
    },
    isPaid:{
        type: Boolean,
        require:true,
        default: false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type: Boolean,
        require:true,
        default: false
    },
    deliveredAt:{
        type: Date
    },
}, {
    timeStams: true
})

const Order = mongoose.model('Order', orderSchema)
export default Order