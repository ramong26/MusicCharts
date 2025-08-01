import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  userId: string;
  spotifyAccessToken?: string;
}

export async function getUserFromJwt(): Promise<JwtPayload | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get('jwt')?.value;

    if (!token) {
      console.warn('JWT not found in cookies');
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Failed to verify JWT:', error);
    return null;
  }
}
