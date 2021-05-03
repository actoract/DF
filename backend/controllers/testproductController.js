import TestProduct from '../models/testproductModel.js'
import expressAsyncHandler from 'express-async-handler'

//@description Fetch ll products
//@route GET /api/testproducts
//@access Public
const getTestProducts = expressAsyncHandler(async (req, res) => {
    const testproducts = await TestProduct.find({})
    res.json(testproducts)
})

//@description Fetch single products
//@route GET /api/testproducts/:id
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


//@description Creare test product
//@route POST /api/testproducts
//@access private for admin
const createTestProduct = expressAsyncHandler(async (req, res) => {
    const testproduct = await TestProduct({
        name:{
            nameRus:'Sample name',
            nameEng:'Sample name',
        },
        user: req.user._id,
        image: '/images/sample.jpg',
        model: '/models/Model_11.glb',
        description: {
            care: "Машинная стирка согласно инструкции на этикетке",
            material: "100% полиэстер",
            color: "Голубой"
        },
    })
    const createdTestProduct = await testproduct.save()
    res.status(201).json(createdTestProduct)
})

//@description Update test product
//@route POST /api/testproducts/:id
//@access private for admin
const updateTestProduct = expressAsyncHandler(async (req, res) => {
    const {name, image, model, description} = req.body
    const testproduct = await TestProduct.findById(req.params.id)
    if (testproduct){
        testproduct.name.nameRus = name.nameRus
        testproduct.name.nameEng = name.nameEng
        testproduct.image = image
        testproduct.model = model
        testproduct.description.care = description.care
        testproduct.description.material = description.material
        testproduct.description.color = description.color
        const updatedTestProduct = await testproduct.save()
        res.json(updatedTestProduct)
    }
    else{
        res.status(404)
        throw new Error ('Test product not found')
    }
})


//@description Create review
//@route POST /api/testproducts/:id/reviews
//@access private
const createReviewTestProduct = expressAsyncHandler(async (req, res) => {
    const {rating, comment} = req.body
    const testproduct = await TestProduct.findById(req.params.id)
    if (testproduct){
        const existReview = testproduct.reviews.find(rev => rev.user.toString() === req.user._id.toString())
        if(existReview){
            res.status(400)
            throw new Error ('Test product is already reviewed')
        }
        const review ={
            firstName: req.user.firstName,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        testproduct.reviews.push(review)
        testproduct.ratingNum = testproduct.reviews.length
        testproduct.rating = testproduct.reviews.reduce((acc, item) => item.rating + acc, 0)/testproduct.reviews.length
        await testproduct.save()
        res.status(201).json({message: 'Review is added'})
    }
    else{
        res.status(404)
        throw new Error ('Test product not found')
    }
})


//@description Delete test product
//@route DELETE /api/testproducts/:id
//@access private for admin
const deleteTestProduct = expressAsyncHandler(async (req, res) => {
    const testproductExist = await TestProduct.findById(req.params.id)
    if (testproductExist){
        await testproductExist.remove()
        res.json({message: 'Test product is removed'})
    }
    else{
        res.status(404)
        throw new Error ('Not found')
    }
    res.json(testproductExist)
})

export {
    getTestProducts,
    getTestProductById,
    deleteTestProduct,
    createTestProduct,
    updateTestProduct,
    createReviewTestProduct
}