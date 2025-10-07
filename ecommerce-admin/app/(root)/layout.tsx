import prismadb from "@/lib/prismadb";
import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export default async function SetupLayout(req: NextRequest,{
  children,
  
}: {
  children: React.ReactNode;
}) {
  const { userId } = getAuth(req); 
  if (!userId) {
    redirect("/sign-in");                      
  }

  const store = await prismadb.store.findFirst({
    where:{
        userId,

    }
  });
  if(store)
  {
    redirect(`/${store.id}`);
  }

  return(
    <>
        {children}
    </>
  )
}