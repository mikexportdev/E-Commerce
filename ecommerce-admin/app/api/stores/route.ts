
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest)
{
    try{
        const {userId} =getAuth(req);
        const body = await req.json();
        const {name } = body;
        if(!userId)
        {
            return new NextResponse("Unauthorized",{status:401});

        }

        if(!name)
        {
            return new NextResponse("Name is required",{status:401})

        }
        const store = await prisma.store.create({
            data:{
                name,
                userId
            }
        })
    }catch(error){
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal Error",{status:500});
    }
    
    
}