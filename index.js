import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import routes here
import testRoutes from "./routes/test.js";
import userRoutes from "./routes/userRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import productDetailsRoute from "./routes/productDetailsRoute.js";
dotenv.config();
mongoose.set('strictQuery',false);   
mongoose
  .connect('mongodb+srv://kavi:kavi@kavindu98.xvfmpyv.mongodb.net/Mobileapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    // app.listen(PORT, () => {
    //   console.log(`Server is Running on Port http://localhost:${PORT}`);
    // })
  {console.log("running")}
  )
  .catch((error) => {
    console.log(error);
  });

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/productData',productDetailsRoute);
app.use('/driver',driverRoutes);
app.use("/test", testRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello From Homepage");
});

app.listen(PORT,() => {
  console.log(`App is running on ${PORT}`);
})

// app.listen(PORT, () =>
//   console.log(`Server is Running on Port http://localhost:${PORT}`)
// );

