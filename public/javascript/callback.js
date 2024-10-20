import axios from 'axios';

// Configure these with your Roblox OAuth details
const CLIENT_ID = '2759614236093732470';
const CLIENT_SECRET = 'RBX-ybIdynwcVkGK5s8X0zQYpWOZfgF4XCf3FakrLomj3_fpnaVNUAaB-nh0SrL4vc';
const REDIRECT_URI = 'https://rxireland.org'; // Make sure this matches your Roblox OAuth settings
export default async function handler(req, res) {
    const authorizationCode = req.query.code;

    if (!authorizationCode) {
        return res.status(400).json({ error: 'Authorization code missing' });
    }

    try {
        // Exchange the authorization code for an access token
        const tokenResponse = await axios.post('https://apis.roblox.com/oauth/v1/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: authorizationCode,
                redirect_uri: REDIRECT_URI,
            },
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token } = tokenResponse.data;

        // Use the access token to get user information
        const userResponse = await axios.get('https://apis.roblox.com/oauth/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        // Get user data (for example, Roblox username and ID)
        const userData = userResponse.data;

        // Respond with the user information
        return res.status(200).json({
            message: 'User authenticated successfully!',
            user: userData,
        });

    } catch (error) {
        console.error('Error during OAuth flow:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Authentication failed' });
    }
}
