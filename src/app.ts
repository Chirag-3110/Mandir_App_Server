import express from 'express';
import AdminAuthRoute from './AdminApi/Auth';
import configMongoDB from './Config/DBConfig'
import config from 'dotenv'
import UserController from './AdminApi/User';
import EventController from './AdminApi/Events';
import ClearDB from './Config/EmptyDB';
config.configDotenv()
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;

import path from 'path';
app.use(express.json())


const corsOptions = {
    origin: 'http://localhost:3000',
  };

app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: true }))

app.listen(port, async () => {
    
    await configMongoDB()
});


app.use(AdminAuthRoute)

app.use(UserController)

app.use(EventController)
app.use('/apiDoc', express.static(path.join(__dirname, 'public')));

app.use(ClearDB)

// app.use(NewsRouter)
