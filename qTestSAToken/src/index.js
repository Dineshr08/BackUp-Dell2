import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import pool from "./config/db.js";
import createUsersTable from "./data/createUsersTabel.js";
import createUsersServiceTabels from "./data/createUsersServiceTabel.js";
import createServiceAccounts from "./data/createServiceAccountsTable.js";
import createAuditTable from "./data/createAuditTable.js";
import mainRouter from "./routes/main.js"
import errorHandleling from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port  = process.env.PORT || 3000;

//Middleware

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//User Routes
app.use("/api", mainRouter)

//Error Handeling Middleware
app.use(errorHandleling);

//Create Table if not exist
createUsersTable();
createServiceAccounts();
createUsersServiceTabels();
createAuditTable();

//Test DB Connection
app.get("/", async(req, res)=>{
    const result = await pool.query("SELECT current_database()");
    res.send(`The DB Name is: ${result.rows[0].current_database}`)
})

//Server is Running

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

