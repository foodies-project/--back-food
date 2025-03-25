import jwt from "jsonwebtoken";

const secretKey = "2q3fplfsb9e";

// генерація токену
export const generateToken = (payload: object): string => {
  const token = jwt.sign(payload, secretKey);
  return token;
};

// валідація токену
export const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
