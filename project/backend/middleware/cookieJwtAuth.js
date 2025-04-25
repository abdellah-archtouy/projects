import jwt from 'jsonwebtoken';

async function cookeiJwtAuth(req, res, next) {
    const token = req.cookies.token;
    try {
        const user = await jwt.verify(token, process.env.MY_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        res.clearCookie('token');
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
export default cookeiJwtAuth;