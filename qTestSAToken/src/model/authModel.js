import pool from "../config/db.js";

export const validateUserService = async(username)=>{

    const result = await pool.query(
      `INSERT INTO users(username)
       VALUES($1)
       ON CONFLICT(username) DO NOTHING`,
      [username]
    );

    return result.rows[0];

};