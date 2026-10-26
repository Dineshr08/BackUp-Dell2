import pool from "../config/db.js";

const createUsersTable = () =>{

    const queryText = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL
);`

    try {
        const result  = pool.query(queryText);
        console.log('Users Table Created Successfully');
    } catch (error) {
        console.log('Error Creating Table');
    }

}

export default createUsersTable;