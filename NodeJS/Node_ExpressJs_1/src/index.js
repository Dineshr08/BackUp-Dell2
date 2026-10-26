import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandleling from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes

app.use("/api", userRoutes);


//Error Handeling Middleware
app.use(errorHandleling);

//Create Table If not exist
createUserTable();


//Testing DB connection

app.get("/", async(req, res)=>{
  const result = await pool.query("SELECT current_database()");
  // console.log(result);
  res.send(`The DB is: ${result.rows[0].current_database}`);
});

//Server Running
app.listen(port, ()=>{
  

  console.log(`Server is running on http://localhost:${port}`)
});