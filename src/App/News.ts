import { connection } from "../Config/DBConfig"
import { verifyToken } from "../Middleware/HelperFunction"

const express = require('express')

const AppNews = express.Router() 

AppNews.get("/app/newsList",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified === true){
        const page = parseInt(req.query.page as string, 10) || 1;
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
        const offset = (page - 1) * pageSize;
        let getAppEvents = "Select * FROM news WHERE is_active = ? AND is_delete = ? LIMIT ?, ?";
        connection.query(getAppEvents,[1,0,offset, pageSize], async (err, result) =>{
            if (err) {
                res.json({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            }
           else{
            const countQuery = `SELECT COUNT(*) AS total FROM news WHERE is_active = ? AND is_delete = ?`;
            connection.query(countQuery,[1,0], (countErr, countResult) => {
                if (countErr) {
                    res.status(500).json({
                        status: 500,
                        message: "Internal server error",
                        data: countErr
                    });
                } else {
                    const totalUsers = countResult[0].total;
                    const totalPages = Math.ceil(totalUsers / pageSize);
                   
                    res.json({
                        status: 200,
                        message: "News fetched successfully",
                        data: {
                            news: result,
                            pagination: {
                                page: page,
                                pageSize: pageSize,
                                totalPages: totalPages,
                                totalUsers: totalUsers
                            }
                        }
                    });
                }
            });
           }
        })

    }else{
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
})

export default AppNews
