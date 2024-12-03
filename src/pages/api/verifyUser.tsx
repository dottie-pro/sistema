import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
require('env')

interface UserAuthenticationObject {
    email?: string,
    cpf?: string
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        try {
            const { userAuthentication } = req.body as { userAuthentication: UserAuthenticationObject };

            if (!userAuthentication || typeof userAuthentication !== 'object') {
                return res.status(400).json({ success: false, message: 'Invalid user data' });
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/redacao-online/verify-student/status`, { userData: userAuthentication });

            if (response?.data) {
                const { result } = response?.data

                if (!result?.userExists) {
                    return res.status(200).json({ success: false, message: 'Usuário não existe' });
                }

                if (result?.ok) {
                    return res.status(200).json({ success: true, message: 'Autenticado.', user: result?.essayData });
                }

                if (result?.essayFinished) {
                    return res.status(200).json({ success: false, message: 'Prova já realizada' });
                }

                res.status(200).json({ success: false, message: 'A Redação ainda não está disponível.' });
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