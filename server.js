const express=require("express")
const dotenv=require("dotenv")
const morgan=require("morgan")
const cors=require("cors")
const connectDB = require("./config/db")
//rest object
const app=express()
//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
//dot config
dotenv.config();



connectDB();

//port
const PORT=process.env.PORT||8080;
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/inventory",require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics",require("./routes/analyticsRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));



//listen
app.listen(PORT,()=>
{
    console.log(`running on port ${PORT}`)
}) 