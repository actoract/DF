import mongoose from 'mongoose'

const imageSchema = mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'User'
    },
    orderItems: [{
        name: {type: String, require: true},
        qty: {type: Number, require: true},
        size: {type: Number},
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
    shippingAddress:{
        address: {type: String, require: true},
        city: {type: String, require: true},
        postcode: {type: String, require: true},
        country: {type: String, require: true},
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
    image: [imageSchema],
}, {
    timeStams: true
})

const Order = mongoose.model('Order', orderSchema)
export default Order