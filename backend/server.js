import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
//import products from './data/products.js'
//import testproducts from './data/testproducts.js'
import productRoutes from './routes/productRoutes.js'
import testproductRoutes from './routes/testproductRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

const app = express()

dotenv.config()
connectDB()


app.get('/', (req, res) => {
    res.send('API is running')
})
app.use('/api/products', productRoutes)
/*app.get('/api/products', (req, res) => {
    res.json(products)
})
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id)
    res.json(product)
})*/

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

const PORT = process.env.PORT || 5000
app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
