import axios from "axios";

export const getOAuthToken = async (serviceUsername, servicePassword) => {
    try {
        // Base64 encode client credentials (Basic Auth)
        const clientId = "qtest"; // replace if different
        const clientSecret = "";  // if any
        const basicAuth = Buffer
            .from(`${clientId}:${clientSecret}`)
            .toString("base64");

        const response = await axios.post(
            "https://qtest.gtie.dell.com/oauth/token",
            new URLSearchParams({
                grant_type: "password",
                username: serviceUsername,
                password: servicePassword
            }),
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${basicAuth}`
                }
            }
        );

        const { access_token, token_type } = response.data;

        // Construct Bearer token
        const bearerToken = `${token_type} ${access_token}`;

        return bearerToken;

    } catch (error) {
        console.error("OAuth Token Error:", error.response?.data || error.message);
        throw error;
    }
};

export default getOAuthToken;
