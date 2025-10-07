import { ReactNode } from "react";
import { auth, getAuth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout(req: NextRequest,{
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const { userId } = getAuth(req); 
  if (!userId) {
    redirect("/sign-in");                      
  }

  const store = await prismadb.store.findFirst({
    where:{
        id: params.storeId,
        userId
    }
  });
  if(!store)
  {
    redirect('/');
  }
  return (<>
  
    <div>this will be a Navbar</div>
    {children}
  </>
  );
}