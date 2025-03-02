import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const client = await supabaseServer();
    const { error } = await client.auth.signOut();
    if (error) {
        return {
            status: 500,
            body: error.message,
        };
    }

    redirect("/");
}