import Order from '../models/orderModel.js'
import expressAsyncHandler from 'express-async-handler'

//@description Create new item
//@route POST /api/orders
//@access Private
const addOrder = expressAsyncHandler(async (req, res) => {
    const {orderItems, deliveryAddress, paymentMethod, totalPrice, isDelivered, isPaid} = req.body
    if(orderItems && orderItems.length == 0){
        res.status(400)
        throw new Error('No new items')
    }
    else{
        const order = new Order({
            orderItems, 
            deliveryAddress, 
            paymentMethod,
            user: req.user._id,
            totalPrice,
            isDelivered,
            isPaid,
            paidAt: Date.now()
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

//@description Update order to paid
//@route GET /api/orders/:id/pay
//@access Private
const paidOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
})


//@description Get user orders
//@route GET /api/orders/myorders
//@access Private
const getLogedUserOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

//@description Get all orders
//@route GET /api/orders
//@access Private
const getOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id firstName lastName email')
    res.json(orders)
})
//@description Update delivery status
//@route GET /api/orders/:id/deliver
//@access Private admin
const updateOrderStatus = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error('Order not found')
    }
})

export {
    addOrder,
    getOrderById,
    paidOrder,
    getLogedUserOrders,
    getOrders,
    updateOrderStatus
}