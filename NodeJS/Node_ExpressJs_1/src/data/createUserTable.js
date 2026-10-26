import pool from "../config/db.js";

const createUserTable = () =>{

    const queryText = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
)`;

    try {
        const result  = pool.query(queryText);
        console.log('User Table Created Successfully');
    } catch (error) {
        console.log('Error Creating Table');
    }

}

export default createUserTable;