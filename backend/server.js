import express from 'express'
import path from 'path'//nodejs module to work with files
import dotenv from 'dotenv'
import connectDB from './config/db.js'
//import products from './data/products.js'
//import testproducts from './data/testproducts.js'
import productRoutes from './routes/productRoutes.js'
import testproductRoutes from './routes/testproductRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import  uploadImageRoutes from './routes/uploadImageRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

const app = express()
app.use(express.json())

dotenv.config()
connectDB()

//HTTP GET "/"
app.get('/', (req, res) => {
    res.send('API is running')
})
//specified middleware function to "/products"
app.use('/api/products', productRoutes)
//specified middleware function to "/users"
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploadimage', uploadImageRoutes)

const __dirname = path.resolve()
app.use('/upload', express.static(path.join(__dirname, '/upload')))//Making statis folder
/*app.get('/api/products', (req, res) => {
    res.json(products)
})
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id)
    res.json(product)
})*/

//specified middleware function to "/testproducts"
app.use('/api/testproducts', testproductRoutes)

/*app.get('/api/testproducts', (req, res) => {
    res.json(testproducts)
})
app.get('/api/testproducts/:id', (req, res) => {
    const testproduct = testproducts.find((p) => p.id === req.params.id)
    res.json(testproduct)
})*/

app.use(notFound)
app.use(errorHandler)

//connections on the specified host and port 5000
const PORT = process.env.PORT || 5000
app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
