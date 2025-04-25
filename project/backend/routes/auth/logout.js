import { PrismaClient } from '@prisma/client';


async function logout(req, res){
    try {
        res.clearCookie('token');
        console.log('Logout successful');
        return res.status(200).json({ message: 'Logout successful' });
    
      } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };

export default logout;