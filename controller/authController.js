const usermodel = require("../models/usermodel");
//for encrypting the password user writing in registeration form
const bcrypt=require('bcryptjs');
//jwt is used used to securely transfer information over the web(between two parties)
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
//for registeration on app
const registerController=async(req,res)=>{
    try{
        const existingUser=await usermodel.findOne({email:req.body.email});
        //validation
        if(existingUser)
        {
            return res.status(200).send({
                success:false,
                message:'User Already exists'
                
                
            });
        };
        //to store the data in database
        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        req.body.password=hashedPassword;
        //rest data
        const user=new usermodel(req.body);
        await user.save();
        return res.status(201).send({
            success:true,
            message:'user Registered successfully',
            user
        });


    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error In register API",
            error
        });
    };
};

//login call back
const loginController=async(req,res)=>{
    try{
        const user=await usermodel.findOne({email:req.body.email})
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:'User Not Found',
            })
        } 
        //check role
        if(user.role!==req.body.role)
        {
            return res.status(500).send({
                success:false,
                message:"role doesnt match",
            })
        }  
        //compare password
        const comparePassword=await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword)
        {
            return res.status(500).send({
                success:false,
                message:"invalid credentials"
            })
        }
        //expiresIN means userf have to login it again after this time
        //token is encrypted
        const token=jwt.sign({userId :user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        return res.status(200).send({
            success:true,
            message:'login successfully',
            token,
            user
        })

    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login api',
            error
        })
    }   
}


//Get current user
const currentUserController=async(req,res)=>{
    try{
        const user=await usermodel.findOne({ _id :req.body.userId});
        return res.status(200).send({
            success:true,
            message:"user fetched successfully",
            user,
        });
    } catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"unable to get current user",
            error,
        });
    }
};
module.exports={registerController,loginController,currentUserController};