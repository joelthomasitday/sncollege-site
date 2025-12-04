import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function createToken(payload: object): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
}

export function verifyToken(token: string): any {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}
