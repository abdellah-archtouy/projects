// utils/jwt.js
import jwt from 'jsonwebtoken';


export const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.MY_SECRET,
    { expiresIn: '1m' }
  );
};

export const generateRefreshToken = async (user, prisma) => {
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.MY_SECRET,
    { expiresIn: '7d' }
  );

  // Store refresh token in database
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return refreshToken;
};

export const verifyRefreshToken = async (token, prisma) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!storedToken || storedToken.user.id !== decoded.userId) {
      throw new Error('Invalid token');
    }

    return storedToken.user;
  } catch (error) {
    throw error;
  }
};
