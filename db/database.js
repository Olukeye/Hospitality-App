import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const { MONGO_URL } = process.env;



export default  async function connection() {
  try{
    const connectionParams = {
      useNewUrlParser:true,
      useUnifiedTopology: true
    };
    await mongoose.connect(process.env.MONGO_URL, connectionParams);
    console.log("database is connected")
  } catch(err) {
    console.log(err, "could not connect to database" )
  }
}

mongoose.set('strictQuery', false);