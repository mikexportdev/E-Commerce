import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/app/(dahboard)/[storeId]/(routes)/settings/components/settings-form";
interface SettingsPageProps{
    params:{
        storedId:string;
    }
};



const SettingsPage:React.FC<SettingsPageProps> =async ({
    params
}) =>{
    const {userId} = await auth();
    if(!userId)
    {
        redirect("/sign-in");
    }
    const store = await prismadb.store.findFirst({
        where:{
            id:params.storedId,
            userId
        }
    });
    if(!store)
    {
        redirect("/");

    }
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm/>

            </div>
        </div>
    );
}

export default SettingsPage;
