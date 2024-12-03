import { UserAuthentication } from '@/context/AppContext';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
require('env')


async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        try {
            const { userAuthentication } = req.body as { userAuthentication: UserAuthentication };

            if (!userAuthentication || typeof userAuthentication !== 'object') {
                return res.status(400).json({ success: false, message: 'Invalid user data' });
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, { ...userAuthentication });
            if (response?.data) {
                const { success } = response?.data

                if (success) {
                    return res.status(200).json({ success: true, user: response.data.user });
                } else {
                    res.status(200).json({ success: false, message: 'Erro ao criar.' });
                }

            }

        } catch (error: any) {
            if(error?.response.status === 401){
                res.status(200).json({ success: false, message: 'Dados inválidos.' });
            }
            res.status(500).json({ success: false });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler