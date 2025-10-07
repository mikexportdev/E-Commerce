
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req); 
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();
    if (!name?.trim()) return new NextResponse("Name is required", { status: 400 });

    // const store = await prismadb.store.create({
    //     data: {
    //         name,
    //         userId
    //     }
    // });
    return NextResponse.json({ ok: true, userId, name }, { status: 201 });
    // return NextResponse.json(store);
  } catch (e) {
    console.error("[STORES_POST]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}