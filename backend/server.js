const express = require('express');
const User = require("./Model/UserSchema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const morgan = require('morgan');
const router = require('./Routes/Routes');
const productRouter = require('./Routes/ProductRoutes'); 
const cors = require('cors');
const cookieParser = require('cookie-parser')

dotenv.config();
const app = express();
app.use(cors());

PORT = process.env.PORT||8082;
const CONNECTION =process.env.MONGO_DB;
mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch((error) => console.log(`${error} did not connect`));

  app.use(express.json());
  app.use(cookieParser());

app.listen(PORT, () => console.log(`Server is running on  http://localhost:${PORT}`))
// app.use(morgan("tiny"));
app.use(router);
app.use(productRouter);



