import pool from "../config/db.js";

export const getUserService = async (username) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
    );

    return result
};

export const getServiceAccountService = async (serviceName) => {
    const result = await pool.query(
        "SELECT * FROM service_accounts WHERE serviceaccount_name=$1",
        [serviceName]
    );

    return result
};


export const checkMappingService = async (userResult, serviceResult) => {
    const result = await pool.query(
        `SELECT * FROM user_service_mapping
     WHERE user_id=$1 AND service_account_id=$2`,
        [userResult, serviceResult]
    );

    return result;
};

export const updateAuditHistory = async (username, serviceName) => {
    const result = await pool.query(
        `INSERT INTO audit_history (username, service_account)
         VALUES ($1, $2)`,
        [username, serviceName]
    );

    return result;
};