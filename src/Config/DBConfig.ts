import { admins, events, featured, news, userTable } from "./tables";

var mysql = require('mysql2');

const encrypt = require('bcrypt');
const env = require('dotenv')
env.config()
const options = {
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
}
const saltRounds = 10;
export const connection = mysql.createConnection(options);
const configMongoDB = async () => {
console.log(options);
console.log(process.env.USER_NAME);


  connection.connect(function (err, result) {
    console.log(err,"error");
    
   
    connection.query(`CREATE DATABASE IF NOT EXISTS jaiDB`, async function (err, result) {
      if (err) {
        console.log(err, "err");
        
      } else {
        console.log("Database created or already exists");
        connection.query(userTable)
        connection.query(events)
        connection.query(news)
        connection.query(featured)
        connection.query(admins)

        const findUser = 'SELECT COUNT(*) as count FROM admin WHERE email = ?'
        connection.query(findUser, ["admin@yopmail.com"], async (err, existingUser) => {
          console.log(existingUser[0].count);
          if (existingUser[0].count == 0) {
            const pass = await encrypt.hash("123456", 10);
            const createdDate = new Date().toUTCString()
            const body = {
              email: "admin@yopmail.com",
              password: pass,
              created_at: createdDate
            }
            connection.query('INSERT INTO admin SET ?', body, (err, result) => {
              console.log(err, "err");
              console.log(result, "result");

            })
          }
        })

      }

    });

  });

}
export default configMongoDB 