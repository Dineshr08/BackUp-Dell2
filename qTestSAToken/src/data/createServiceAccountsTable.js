import pool from "../config/db.js";

const createServiceAccounts = () =>{

    const queryText = `CREATE TABLE IF NOT EXISTS service_accounts  (
    id SERIAL PRIMARY KEY,
    serviceaccount_name VARCHAR(255) UNIQUE NOT NULL
);`

    try {
        const result  = pool.query(queryText);
        console.log('ServiceAccounts Table Created Successfully');
    } catch (error) {
        console.log('Error Creating Table');
    }

}

export default createServiceAccounts;