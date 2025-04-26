import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

async function signuphandler(req, res){
    try {
        const { firstname, lastname, username, email, password } = req.body;
    
        if (!firstname || !lastname || !username || !email || !password) {
          return res.status(400).json({ message: 'Please fill all fields' });
        }
    
        const userExists = await prisma.user.findUnique({
          where: {
            email: email,
          }
        });
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { firstname, lastname, username, email, hashedPassword };
        await prisma.user.create({
          data: {
            firstname,
            lastname,
            username,
            email,
            password : hashedPassword,
          }
        });
    
        return res.status(201).json({ 
          message: 'User created successfully',
          user: newUser
        });
    
      } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };

export default signuphandler;