import pool from "../config/db.js";

export const createAuditTable = ()=>{
    const queryText = `CREATE TABLE IF NOT EXISTS audit_history  (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    service_account VARCHAR(255) NOT NULL,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);`

 try {
        const result  = pool.query(queryText);
        console.log('Audit History Table Created Successfully');
    } catch (error) {
        console.log('Error Creating Table');
    }
}

export default createAuditTable;