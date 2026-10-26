import pool from "../config/db.js";

const createUsersServiceTabels = () =>{

    const queryText = `CREATE TABLE IF NOT EXISTS user_service_mapping  (
    user_id INT REFERENCES users(id),
    service_account_id INT REFERENCES service_accounts(id),
    PRIMARY KEY(user_id, service_account_id)
);`

    try {
        const result  = pool.query(queryText);
        console.log('UsersService Table Created Successfully');
    } catch (error) {
        console.log('Error Creating Table');
    }

}

export default createUsersServiceTabels;