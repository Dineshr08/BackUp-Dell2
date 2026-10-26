import pool from "../config/db.js";
import { handleResponse } from "../middleware/responseHandler.js";
import serviceAccounts from "../../serviceAccounts.json" with { type: "json" };
import { checkMappingService, getServiceAccountService, getUserService, updateAuditHistory } from "../model/serviceModel.js";
import { getOAuthToken } from "../middleware/loginQTest.js";


export const fetchToken = async (req, res) => {
    try {
        const { serviceName } = req.body;
        const username = req.user.username;

        if (!serviceName)
            return handleResponse(res, 400, "Service name is required");

        const userResult = await getUserService(username);

        if (userResult.rows.length === 0)
            return handleResponse(res, 403, "User not found");

        const user = userResult.rows[0].id;

        const serviceResult = await getServiceAccountService(serviceName)


        if (serviceResult.rows.length === 0)
            return handleResponse(res, 404, "Service Account not found");

        // const service = serviceResult.rows[0].id;

        // const mapping = await checkMappingService(user, service);

        // if (mapping.rows.length === 0)
        //     return handleResponse(res, 403, "No permission to access this service account");

        const creds = serviceAccounts.find(s => s.name === serviceName);


        const bearerToken = await getOAuthToken(
            creds.username,
            creds.password
        );



        if (!bearerToken)
            return handleResponse(res, 500, "Bearer token not found in response");
        

        const updateHistory = await updateAuditHistory(username, serviceName)

        if (updateHistory.rowCount === 0)
            return handleResponse(res, 500, "History Failed to update");


        return handleResponse(res, 200, "Token fetched successfully", {
            token: bearerToken
        });

    } catch (error) {
        console.error(error.stack);
        console.error("fetchToken Error:", error.message);
        return handleResponse(res, 500, "Internal Server Error");
    }
};
