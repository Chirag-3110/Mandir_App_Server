import express from 'express';
import AdminAuthRoute from './AdminApi/Auth';
import configMongoDB from './Config/DBConfig'
import config from 'dotenv'
import UserController from './AdminApi/User';
config.configDotenv()
const app = express();
const cors = require('cors');


const port = process.env.PORT || 8000;
const allowedOrigins = ['https://example.com'];

app.use(express.json())
app.use(cors(
    {
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
      }
));

app.use(express.urlencoded({ extended: true }))

app.listen(port, async () => {
    console.log(port);
    
    await configMongoDB()
});

app.use(AdminAuthRoute)

app.use(UserController)
// app.use(NewsRouter)
