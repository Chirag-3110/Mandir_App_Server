import express from 'express';
// import authRoute from './Routes/Auth';
import AdminAuthRoute from './AdminApi/Auth';
import configMongoDB from './Config/DBConfig'
const app = express();
import config from 'dotenv'
import UserController from './AdminApi/User';
config.config()
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(port, async () => {
    await configMongoDB(process.env.HOST,process.env.USER,process.env.PASSWORD)
    console.log(`listening at http://localhost:${port}`);
});
app.use(AdminAuthRoute)
app.use(UserController)
// app.use(NewsRouter)
