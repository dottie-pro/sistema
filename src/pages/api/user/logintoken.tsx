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
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'POST') {
        try {

            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: 'Token não fornecido' });
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/loginbytoken`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            if (response?.data) {
                const { success } = response?.data

                if (success) {
                    return res.status(200).json({ success: true, user: response.data.user });
                } else {
                    res.status(200).json({ success: false, message: 'Erro ao criar.' });
                }

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