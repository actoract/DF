import Product from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'

//@description Fetch ll products
//@route GET /api/products
//@access Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    // console.log(products)
    res.json(products)
    return
})

//@description Fetch single products
//@route GET /api/products/:id
//@access Public
const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product){
        res.json(product)
        return
    }
    else{
        res.status(404)
        throw new Error('Not found')
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
        return
    }
    else{
        res.status(404)
        throw new Error ('Not found')
    }
    res.json(productExist)
})


//@description Creare product
//@route POST /api/products
//@access private for admin
const createProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product({
        name:{
            nameRus:'Sample name',
            nameEng:'Sample name',
        },
        price:{
            priceDigital:500,
            priceReal:1500,
        },
        user: req.user._id,
        image: '/images/sample.png',
        model: '/models/Model_11.glb',
        description: {
            care: "Машинная стирка согласно инструкции на этикетке",
            material: "100% полиэстер",
            color: "Голубой"
        },
        price:{
            priceDigital: 500,
            priceReal: 1500,
        },
        sizeStatus: {
            XS: 500,
            S: 1500,
            M: 1500,
            L: 1500,
        },
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    return
})

//@description Update product
//@route POST /api/products/:id
//@access private for admin
const updateProduct = expressAsyncHandler(async (req, res) => {
    const {name, image, model, price, description, sizeStatus} = req.body
    const product = await Product.findById(req.params.id)
    if (product){
        product.name.nameRus = name.nameRus
        product.name.nameEng = name.nameEng
        product.image = image
        product.model = model
        product.price.priceDigital = price.priceDigital
        product.price.priceReal = price.priceReal
        product.description.care = description.care
        product.description.material = description.material
        product.description.color = description.color
        product.sizeStatus.XS = sizeStatus.XS
        product.sizeStatus.S = sizeStatus.S
        product.sizeStatus.M = sizeStatus.M
        product.sizeStatus.L = sizeStatus.L
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error ('Product not found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}