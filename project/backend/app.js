import express from 'express';
import cors from 'cors';
import signuphandler from './routes/auth/signup.js';
import loginHandler from './routes/auth/login.js';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import cookieJwtAuth from './middleware/cookieJwtAuth.js';
import logout from './routes/auth/logout.js';
const prisma = new PrismaClient();

const app = express();
const PORT = 14100;


app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.post('/api/auth/signup', signuphandler);
app.post('/api/auth/login', loginHandler);


app.get('/api/users', cookieJwtAuth, async (req, res) => {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
});

app.get('/api/auth/verify', cookieJwtAuth, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    });
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json(user);
}
);

app.get('/api/auth/logout', cookieJwtAuth, logout);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);