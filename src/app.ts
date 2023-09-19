import express from 'express';
import AdminAuthRoute from './AdminApi/Auth';
import configMongoDB from './Config/DBConfig'
import config from 'dotenv'
import UserController from './AdminApi/User';
config.configDotenv()
const app = express();



const port = process.env.PORT || 8000;

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.listen(port, async () => {
    console.log(port);
    
    await configMongoDB()
});

app.use(AdminAuthRoute)

app.use(UserController)
// app.use(NewsRouter)
