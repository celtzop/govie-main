const axios = require('axios');

async function getAccessToken(authCode) {
    const robloxTokenEndpoint = 'https://auth.roblox.com/oauth/token';
    const clientId = '7968251567315361623';
    const clientSecret = 'RBX-6VjceTiIQEaTj7cC5Z_qCnIPGOSfcr_8K5p6eHLa-iTn6I38YB_TtPDTtNrQ-n-v'; // Store this securely
    const redirectUri = 'https://www.rxireland.org/';
    const scope = 'openid profile group:read user:social:read'; // Scopes for the token

    try {
        const response = await axios.post(robloxTokenEndpoint, {
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
            scope: scope
        });

        return response.data; // Contains access_token and scope information
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
}
