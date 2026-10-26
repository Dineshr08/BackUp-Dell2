import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

const {Pool} = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    ssl: false
    
});

pool.on("connect", ()=>{
    console.log("Database Connection is established")
});

export default pool;