const express=require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require("../controller/inventoryController")


const router=express.Router()

//routes
//ADD INVENTORY||post
router.post('/create-inventory',authMiddleware,createInventoryController)
//get all blood records
router.get('/get-inventory',authMiddleware,getInventoryController)
// get recent blood record
router.get('/get-recent-inventory',authMiddleware,getRecentInventoryController)

//get hospital blood records
router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController)
// get donar record
router.get('/get-donars',authMiddleware,getDonarsController)
// get hospital records
router.get('/get-hospitals',authMiddleware,getHospitalController)
// get organisation records
router.get('/get-organisation',authMiddleware,getOrganisationController)

// get organisation records
router.get('/get-organisation-for-hospital',authMiddleware,getOrganisationForHospitalController)



module.exports=router