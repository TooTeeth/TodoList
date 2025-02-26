import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "비밀번호가 일치하지 않습니다.",
        },
        { status: 401 }
      );
    }

    /*로그인
    1. Session 서버 <-> 사용자 서버 메모리에 로그인 성공한 사용자의 정보를 기록
    장점 - 보안적인 측면 (서버 메모리)
    단점 - 서버 부하

    2. Token (Json Web Token) 토큰 발급 일종의 놀이동산 자유이용권(만료 기간 동안)
    장점 - 서버 부하 적음
    단점 - 보안적인 측면 (클라이언트)

    3.소셜 로그인 (OAuth)
    사용자의 인증 서드파티(구글, 깃헙, 카카오, 네이버, 애플)*/

    const { password: _ignored, ...userData } = user;
    console.log(userData);
    console.log(user);
    return NextResponse.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "로그인에 실패했습니다." }, { status: 500 });
  }
}
