import mongoose, { ConnectOptions } from "mongoose";


const configMongoDB = async (urlString: string) => {
    await mongoose.connect(process.env.URLString, {
        useNewUrlParser: true, useUnifiedTopology: true
    } as ConnectOptions);

    console.log('mongo database connected');
}
export default configMongoDB 