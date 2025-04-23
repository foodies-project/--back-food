import jwt from 'jsonwebtoken';

const secretKey = '2q3fplfsb9e';

export const generateToken = (payload: object): string => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '3d' });
  return token;
};

export const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
