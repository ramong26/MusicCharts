import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/features/auth/schema/loginSchema';
import connectToDB from '@/lib/mongo/mongo';
import { UserModel } from '@/lib/mongo/models/UserModel';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const body = await request.json();
    const parsedData = loginSchema.parse(body);
    const { email, password } = parsedData;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: '존재하지 않는 이메일입니다.' }, { status: 404 });
    }

    if (!user.localSignup) {
      return NextResponse.json({ error: '소셜 계정으로 가입된 이메일입니다.' }, { status: 403 });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ error: '서버 설정 오류: JWT 시크릿 누락' }, { status: 500 });
    }

    const payload = { userId: user._id.toString() };
    const jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

    const response = NextResponse.json(
      { message: '로그인 성공', token: jwtToken },
      { status: 200 }
    );

    response.cookies.set('jwt', jwtToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error('로그인 처리 중 오류 발생:', error);
    return NextResponse.json({ error: '로그인 처리 중 오류 발생' }, { status: 500 });
  }
}
