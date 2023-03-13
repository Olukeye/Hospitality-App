import express from "express"
import connection from "./db/database.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

// routes import
import authRouter from "./routes/auth.js"
import guest_roomRouter from "./routes/guest_rooms.js"
import hotelRouter from "./routes/hotels.js"
import restaurantRouter from "./routes/restaurants.js"
import userRouter from "./routes/users.js"


const app = express()


connection()
dotenv.config();
   
// body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())

// This will set express to open and render our views folder, then to render the files as normal html
app.set('view engin', 'ejs')
// app.engine('html', require('ejs').renderFile)

// app.use(express.static(path.join(__dirname, './views')))

app.get('/', (req, res) => {
    res.render('index', {
        key:process.env.SECRET_KEY
    })
})
// routes middleware
app.use('/api/auth', authRouter);
app.use('/api/rooms', guest_roomRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/users', userRouter);


// Config DB
const { PORT } = process.env;

app.listen(process.env.PORT, () => {
    console.log('server is running on port  ' + PORT)
})
 