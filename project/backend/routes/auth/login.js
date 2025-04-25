import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

async function loginHandler(req, res)  {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.MY_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: false});
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default loginHandler;
