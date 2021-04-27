import Order from '../models/orderModel.js'
import expressAsyncHandler from 'express-async-handler'

//@description Create new item
//@route POST /api/orders
//@access Private
const addOrder = expressAsyncHandler(async (req, res) => {
    const {orderItems, deliveryAddress, paymentMethod} = req.body
    if(orderItems && orderItems.length == 0){
        res.status(400)
        throw new Error('No new items')
    }
    else{
        const order = new Order({
            orderItems, 
            deliveryAddress, 
            paymentMethod,
            user: req.user._id
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//@description Get order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
})


export {
    addOrder,
    getOrderById
}