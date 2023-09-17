var mysql = require('mysql'); 


const options = {
  host:  process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME
} 

export const  connection = mysql.createConnection(options);
const configMongoDB = async () => {
  
  console.log(options,"options");
  
    connection.connect(function(err,result) {
        if (err) throw err;
        connection.query(`CREATE DATABASE ${process.env.DBNAME}`,function (err, result) {
            if (err){
              console.log("Database connected");
            };
            // const userTable = `CREATE TABLE IF NOT EXISTS user (
            //   id INT AUTO_INCREMENT PRIMARY,
            //   name TEXT,
            //   email TEXT,
            //   password TEXT,
            //   created_at TEXT
            // )`

            // connection.query(userTable,(err,result)=>{
            //   if(err){
            //     console.log(err,"userTable");
                
            //   }
            //   console.log(result);
              
            // })
            console.log("Database created");
          });
        
      });
    
}
export default configMongoDB 