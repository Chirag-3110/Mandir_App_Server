const express = require('express')

const ContentRouter = express.Router()

ContentRouter.post("/app-content",(req,res)=>{
    const request  = req.body;
    
})

export default ContentRouter;