import ldap from "ldapjs";
import jwt from "jsonwebtoken";
import { validateUserService } from "../model/authModel.js";
import { handleResponse } from "../middleware/responseHandler.js";

export const validateUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return handleResponse(res, 400, "Username and password are required");
    }

    const client = ldap.createClient({
        url: process.env.LDAP_URL, // ldaps://ausdcamer.amer.dell.com:3269
        tlsOptions: {
            rejectUnauthorized: false
        },
        timeout: 10000,
        connectTimeout: 10000
    });

    client.on("error", (err) => {
        console.error("LDAP Client Error:", err.message);
    });

    // const userDN = `asia-pacific\\${username}`; 
 
    const userDN = username; 
    

    try {
        client.bind(userDN, password, async (err) => {
            if (err) {
                console.error("Bind Error:", err.message);
                client.unbind();
                return handleResponse(res, 401, "Invalid credentials");
            }

            try {
                // Optional: insert user into DB if not exists
                const user = await validateUserService(username);

                const token = jwt.sign(
                    { username },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                client.unbind();

                return handleResponse(res, 200, "Login Successful", {
                    token,
                    username
                });

            } catch (dbError) {
                console.error("DB Error:", dbError.message);
                client.unbind();
                return handleResponse(res, 500, "Database error");
            }
        });

    } catch (error) {
        console.error("Server Error:", error.message);
        client.unbind();
        return handleResponse(res, 500, "Internal Server Error");
    }
};
