var mysql = require('mysql'); 

export const  connection = mysql.createConnection({
    host: process.env.HOST,
    user: "root",
    password: '',
    database:"jainMandir"
  });
const configMongoDB = async (host:string,user:string,password:string) => {
    connection.connect(function(err,result) {
        if (err) throw err;
        console.log("Connected!");
        
        connection.query("CREATE DATABASE jainMandir",function (err, result) {
            if (err){
              console.log("Database connected");
            };
            console.log("Database created");
          });
        
      });
    
}
export default configMongoDB 