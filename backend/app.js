import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoutes from "./routes/product";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', productRoutes);

// Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: false,
  useCreateIndex: true
}).then(() => { console.log("Database connected !") });
mongoose.connection.on('Error', err => { console.log(`Database connect failed, ${err.message}`) });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});