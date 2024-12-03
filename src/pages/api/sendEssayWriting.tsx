import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
require('env')

interface EssayData {
    id_redacao: string | number,
    redacao: string,
    dt_realizacao: Date

}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'PATCH') {
        try {
            const { essayData } = req.body as { essayData: EssayData };

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/redacao-online/student/finished`, { essayData });

            if (response?.status === 200) {
                res.status(200).json({ success: true, message: 'Redação concluída.' });
            } else {
                res.status(200).json({ success: false, message: 'Ocorreu um erro ao finalizar a Redação.' });
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