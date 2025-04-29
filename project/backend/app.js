import express from 'express';
import cors from 'cors';
import signuphandler from './routes/auth/signup.js';
import loginHandler from './routes/auth/login.js';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import cookieJwtAuth from './middleware/cookieJwtAuth.js';
import logout from './routes/auth/logout.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from './utils/jwt.js';
import UpdateSeettings from './routes/updateSettings.js';

const prisma = new PrismaClient();

const app = express();
const PORT = 14100;


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Bearer'] 
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.post('api/auth/refresh', async (req, res) => {
const { refreshToken } = req.body;
if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

try {
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
} catch (error) {
    res.status(403).json({ error: 'Invalid refresh token' });
}
});

app.post('/api/auth/signup', signuphandler);
app.post('/api/auth/login', loginHandler);


app.get('/api/users', cookieJwtAuth, async (req, res) => {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
});

app.get('/api/auth/verify', cookieJwtAuth, async (req, res) => {
    // console.log('req.user', req.user);
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.userId
        }
    });
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json(user);
}
);

app.post('/api/settings' , cookieJwtAuth, UpdateSeettings);

app.get('/api/auth/logout', cookieJwtAuth, logout);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);