import { connection } from "./DBConfig";

const express = require('express')

const ClearDB = express.Router()

const getTablesQuery = 'SHOW TABLES';
let isDeleted = false;
ClearDB.get("/clear-db",(req,res)=>{
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
})


export default ClearDB