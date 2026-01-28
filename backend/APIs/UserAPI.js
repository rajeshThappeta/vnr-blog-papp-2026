import express from 'express'
import {User} from '../models/UserTypeModel.js'
import {getAuth} from '@clerk/express'
export const userRouter=express.Router()

//Routes

// Read User
userRouter.get('/me',async(req,res)=>{
    //get user's userId
   const {userId}= getAuth(req)
   console.log("userId",userId)
   // return 401 if not authenticated
   if(!userId){
    return res.status(401).json({
        error:"UNAUTHORIZED",
        message:"Authentication required"
    })
   }

   //if userId existed,read user from DB
   let user=await User.findOne({clerkUserId:userId})
   console.log("user :",user)
   //if user not found
   if(user===null){
    res.json({firstLogin :true})
   }else{
    res.status(200).json({firstLogin:false,payload:user})
   }
})

// Create user
userRouter.post('/create-user',async(req,res)=>{})