const mongoose=require('mongoose')

const connectDB=async()=>
{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB ${mongoose.connection.host}`)
    }
    catch(error){
        console.log(`mongodb database error`)
    }
}
module.exports=connectDB