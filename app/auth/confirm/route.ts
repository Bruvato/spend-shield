import { EmailOtpType } from "@supabase/supabase-js";
import {type NextRequest } from "next/server";

import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(Request: NextRequest) {
    const { searchParams } = new URL(Request.url);
    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/";

    if (tokenHash && type) {
        const supabase = await supabaseServer();

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
        });

        if (error) {
            console.log("ah shucks1", console.log(error));
        }

        if (!error) {

            redirect(next);
        }

        redirect('/error');
    }   
}