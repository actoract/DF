import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
            // useCreateIndex: true
        })
        console.log(`Mongo DB connected: ${con.connection.host}`)
    }
    catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}
export default connectDB