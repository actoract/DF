import Product from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'

//@description Fetch ll products
//@route GET /api/products
//@access Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

//@description Fetch single products
//@route GET /api/products/:id
//@access Public
const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product)
        res.json(product)
    else{
        res.status(404)
        throw new Error ('Not found')
    }
    res.json(product)
})

//@description Delete product
//@route DELETE /api/products/:id
//@access private for admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
    const productExist = await Product.findById(req.params.id)
    if (productExist){
        await productExist.remove()
        res.json({message: 'Product is removed'})
    }
    else{
        res.status(404)
        throw new Error ('Not found')
    }
    res.json(product)
})

export {
    getProducts,
    getProductById,
    deleteProduct
}