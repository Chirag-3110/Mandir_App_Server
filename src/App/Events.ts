import { verifyToken } from "../Middleware/HelperFunction"

const express = require('express')

const Events = express.Router() 

Events.get("/app/eventsList",(req,res)=>{
    const isVerified = verifyToken(req)

    if(isVerified === true){

    }else{
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
      
})

export default Events
