import axios from 'axios';

const GAME_ID = '18933834133'; // Replace with your Roblox game ID

export default async function handler(req, res) {
    try {
        const response = await axios.get(`https://api.roblox.com/games/${GAME_ID}/players`);
        const playerCount = response.data ? response.data.players : 0;
        res.status(200).json({ playerCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player count' });
    }
}
