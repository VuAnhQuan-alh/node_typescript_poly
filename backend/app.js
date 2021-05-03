import express from "express";
import ExpValid from "express-validator";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");

// Middleware
app.use(morgan('dev'));
app.use(express.json()); // xu ly du lieu giu tu client len server
app.use(cors({ credentials: 'same-origin' }));
app.use(bodyParser.json());
app.use(ExpValid());
app.use(cookieParser());

// Using router
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

// xu ly image tu server len client
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  const data = fs.readFileSync('./image.png');
  res.render('page', {
    image: data.toString('base64')
  })
});

// Connection database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: false,
  useCreateIndex: true
}).then(() => { console.log("Database connected!") });
mongoose.connection.on('Error', err => {
  console.log(`Database connect failed, ${err.message}`);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});