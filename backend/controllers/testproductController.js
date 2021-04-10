import TestProduct from '../models/testproductModel.js'
import expressAsyncHandler from 'express-async-handler'

//@description Fetch ll products
//@route GET /api/products
//@access Public
const getTestProducts = expressAsyncHandler(async (req, res) => {
    const testproducts = await TestProduct.find({})
    res.json(testproducts)
})

//@description Fetch single products
//@route GET /api/products/:id
//@access Public
const getTestProductById = expressAsyncHandler(async (req, res) => {
    const testproduct = await TestProduct.findById(req.params.id)
    if (testproduct)
        res.json(testproduct)
    else{
        res.status(404)
        throw new Error ('Not found')
    }
    res.json(testproduct)
})

export {
    getTestProducts,
    getTestProductById
}