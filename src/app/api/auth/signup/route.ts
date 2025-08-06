import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '@/features/auth/schema/signupSchema';
import connectToDB from '@/lib/mongo/mongo';
import { UserModel } from '@/lib/mongo/models/UserModel';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const body = await request.json();

    const parsedData = signupSchema.parse(body);
    const { email, username } = parsedData;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: '이미 가입된 이메일입니다.' }, { status: 409 });
    }

    const user = new UserModel({
      displayName: username,
      email,
      password: parsedData.password, // 비밀번호는 해싱 처리 필요

      accessToken: '',
      refreshToken: '',

      profileImageUrl: '',
      localSignup: true,
    });

    try {
      await user.validate();
    } catch (err) {
      console.error('유저 검증 실패', err);
    }
    await user.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ error: '서버 설정 오류: JWT 시크릿 누락' }, { status: 500 });
    }

    const payload = { userId: user._id.toString() };
    const jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

    const response = NextResponse.json(
      { message: '회원가입 성공', token: jwtToken },
      { status: 201 }
    );

    response.cookies.set({
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      name: 'token',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      value: jwtToken,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    const err = error as Error;
    console.error(error);
    return NextResponse.json({ error: '회원가입 실패', message: err.message }, { status: 400 });
  }
}
