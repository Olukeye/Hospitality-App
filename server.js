import express from "express"
import connection from "./db/database.js"
import dotenv from "dotenv"


// routes import
import authRouter from "./routes/auth.js"
import guest_roomRouter from "./routes/guest_rooms.js"
import hotelRouter from "./routes/hotels.js"
import restaurantRouter from "./routes/restaurants.js"
import userRouter from "./routes/users.js"


const app = express()


connection()
dotenv.config();
   

// routes middleware
app.use('/api/auth', authRouter);
app.use('/api/rooms', guest_roomRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api', userRouter);


// Config DB
const { PORT } = process.env;

app.listen(process.env.PORT, () => {
    console.log('server is running on port  ' + PORT)
})
 