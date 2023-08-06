const express=require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { bloodGroupDetailsController } = require("../controller/analyticsController")


const router=express.Router()

//routes
//get blood data
router.get('/bloodGroups-data',authMiddleware,bloodGroupDetailsController)


module.exports=router