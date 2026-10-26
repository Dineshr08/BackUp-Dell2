import pkg from "pg";
import dotenv from "dotenv";

const {Pool}  = pkg;

dotenv.config();

const pool = new Pool({
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    ssl:false
});

pool.on("connect", ()=>{
    console.log("Database Connection is established");
});

export default pool;