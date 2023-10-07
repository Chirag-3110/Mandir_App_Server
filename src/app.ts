  import express from 'express';
  import AdminAuthRoute from './AdminApi/Auth';
  import configMongoDB, { connection } from './Config/DBConfig'
  import config from 'dotenv'
  import UserController from './AdminApi/User';
  import EventController from './AdminApi/Events';
  config.configDotenv()
  const app = express();
  const cors = require('cors');

  const path = require('path');
  const port = process.env.PORT || 8000;
  import NewsController from './AdminApi/News';
  import AppAuth from './App/AppAuth';
  import Events from './AdminApi/Events';
  import AppEvents from './App/Events';
  import AppProfile from './App/Users';
  import AppNews from './App/News';
import AddFamily from './App/add_family';
import Searh from './App/search_user';
  app.use(express.json())

    app.use(cors({ origin: 'http://139.144.1.59:9999' }))


  app.use(express.urlencoded({ extended: true }))

  app.listen(port, async () => {
      await configMongoDB()
  });


  app.use(AdminAuthRoute)

  app.use(UserController)

  app.use(EventController)




  const imagesDirectory = path.join(__dirname, '../Images'); // Replace 'Images' with your image directory's name
  // Create a route to serve images
  app.use('/Images', express.static(imagesDirectory));


  app.use(NewsController)

  // app.use(NewsRouter
  //approutes

  app.use(AppAuth)
  app.use(AppEvents)


  app.use(AppProfile)
  app.use(AppNews)
  app.use(AddFamily)

  app.use(Searh)


