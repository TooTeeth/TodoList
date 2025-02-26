import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  try {
    //  사용자 요청으로부터 유저 id 값 가져옴
    const userId = Number(searchParams.get("user-id"));

    // 유저 id 숫자인지? 빈값인지?
    if (isNaN(userId) || userId === 0) {
      throw new Error("Not found userId.");
    }
    const existUser = await prisma.user.findUnique({ where: { id: userId } });
    console.log(existUser);

    //조회
    const todos = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ success: true, data: todos });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "To-do search failed.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { content, userId } = await request.json();

  try {
    const todo = await prisma.todo.create({
      data: {
        content,
        userId,
      },
    });
    return NextResponse.json({ success: true, data: todo });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Todo create failed",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { id }: { id: string }) {}
