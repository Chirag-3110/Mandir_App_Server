import { connection } from "./DBConfig";

const express = require('express')

const ClearDB = express.Router()

import { verifyToken } from '../Middleware/HelperFunction';

const getTablesQuery = 'SHOW TABLES';
let isDeleted = false;
ClearDB.get("/clear-db",(req,res)=>{
    const isVerified = verifyToken(req);
   if(isVerified===true){
    connection.query(getTablesQuery,(err,result)=>{
        if(err){
            res.send({
                status: 500,
                message: "Internal server error",
                data: err
            })
        }
        result.forEach((row)=>{
            const tableName = row["Tables_in_jaiDB"]
            const truncateTableQuery = `TRUNCATE TABLE ${tableName}`;

            connection.query(truncateTableQuery, (err, truncateResult) => {
                if (err) {
                    isDeleted = false;
                } else {
                   isDeleted = true;
                }
              });
            
        })

        if(isDeleted===true){
            res.send({
                status: 200,
                message: "db cleared",
                data: result
            })
        }
        else{
            res.send({
                status: 500,
                message: "Internal server error",
                data: err
            })
        }

        
        
    })
   }else{
    res.send({
        status: 401,
        message: "Unauthenticated",
        data: null
    })
   }
})


export default ClearDB