import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function UpdateSeettings(req, res){
        console.log('UpdateSeettings');
        console.log(req.body);
        return res.status(200).json({message: 'Update successful'});
    };

export default UpdateSeettings;