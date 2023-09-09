import express from 'express';
import authRoute from './Routes/Auth';
import searchRoute from './Routes/Search';
import configMongoDB from './Config/DBConfig'
const app = express();
import config from 'dotenv'
import NewsRouter from './Routes/News';
config.config()
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(port, async () => {
    await configMongoDB(process.env.URLString)
    console.log(`listening at http://localhost:${port}`);
});
app.use(authRoute)
app.use(searchRoute)
app.use(NewsRouter)
