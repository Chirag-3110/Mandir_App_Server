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

const path = require('path');
const port = process.env.PORT || 8000;
import NewsController from './AdminApi/News';
import { upload } from './Middleware/image_upload';
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

app.use(ClearDB)

const imagesDirectory = path.join(__dirname, 'Images'); // Replace 'Images' with your image directory's name

// Create a route to serve images
app.use('/images', express.static(imagesDirectory));


app.use(NewsController)

// app.use(NewsRouter)

app.post("/upload",upload.single("file"),(req,res)=>{
  const filePath = req.file.path;

  console.log(filePath);
  
  res.send({mesasge:"uploaded"})
})
