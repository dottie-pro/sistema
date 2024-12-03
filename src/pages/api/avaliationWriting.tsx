import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
require('env')

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET') {
        try {
            const { writingId } = req.query as { writingId: string | number };


            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/redacao-online/${writingId}`);

            if (response?.data) {

                res.status(200).json(response?.data);
            } else {
                res.status(200).json({ success: false, message: 'Erro ao carregar Redação.' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler