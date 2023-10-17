import { connection } from "../Config/DBConfig";
import { verifyToken } from "../Middleware/HelperFunction";
import { upload } from "../Middleware/image_upload";

const express = require('express')

const Ads = express.Router()

Ads.post("/admin/add-ads" ,upload.single("file"),async (req,res)=>{
    let isVerify = verifyToken(req);
   if (isVerify === true) {
    if(req.file){
        let {screen , file} = req.body;
        let filePath = req.file.filename;
           
        file = filePath;

     connection.query("INSERT INTO ads SET ?", {screen:screen,file:file},async (err,result)=>{
         if(err){
             res.json({
                 status: 500,
                 message: "Internal Srver Error",
                 data: err
             })
         }else{
             res.json({
                 status: 200,
                 message: "Success",
                 data: result
             })
         }
     })
    }else{
        res.json({
            status: 400,
            message: "No File",
            data: null
        })
    }
   } else {
    res.json({
        status: 401,
        message: "Unauthenticated",
        data: null
    })
   }

})

Ads.get("/admin/get-ads",async (req,res)=>{

    let isVerify = verifyToken(req);

   if (isVerify === true) {
     connection.query("SELECT * FROM ads",async (err,result)=>{
         if(err){
             res.json({
                 status: 500,
                 message: "Internal Srver Error",
                 data: err
             })
         }else{
             res.json({
                 status: 200,
                 message: "Success",
                 data: result
             })
         }
     })
   } else {
    res.json({
        status: 401,
        message: "Unauthenticated",
        data: null
    })
   }

})

export default Ads;