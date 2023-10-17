import express from 'express';
import AdminAuthRoute from './AdminApi/Auth';
import configMongoDB, { connection } from './Config/DBConfig'
import config from 'dotenv'
import UserController from './AdminApi/User';
import EventController from './AdminApi/Events';
import NewsController from './AdminApi/News';
import AppAuth from './App/AppAuth';
import AppEvents from './App/Events';
import AppProfile from './App/Users';
import AppNews from './App/News';
import AddFamily from './App/add_family';
import Searh from './App/search_user';
import ContentRouter from './AdminApi/Content';
import { aboutApp, ads } from './Config/tables';
import Ads from './AdminApi/Ads';
config.configDotenv()
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8000;


var allowedOrigins = ['http://localhost:3000',
  'http://139.144.1.59:9999', "http://139.144.1.59"];
app.use(express.json())

app.use(cors({
  origin: function (origin, callback) {    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    } return callback(null, true);
  }
}))

app.use(express.urlencoded({ extended: true }))

app.listen(port, async () => {
  await configMongoDB()
});

app.use(AdminAuthRoute)

app.use(UserController)

app.use(EventController)

const imagesDirectory = path.join(__dirname, '../Images'); // Replace 'Images' with your image directory's name

app.use('/Images', express.static(imagesDirectory));

app.use(NewsController)

app.use(Ads)

app.use(AppAuth)

app.use(AppEvents)

app.use(AppProfile)

app.use(AppNews)

app.use(AddFamily)

app.use(ContentRouter)

app.use(Searh)


