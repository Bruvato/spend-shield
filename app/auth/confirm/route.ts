import { EmailOtpType } from "@supabase/supabase-js";
import {type NextRequest } from "next/server";

import { supabaseClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export async function GET(Request: NextRequest) {
    const { searchParams } = new URL(Request.url);
    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/";

    if (tokenHash && type) {
        const supabase = await supabaseClient();

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
        });

        if (!error) {
            redirect(next);
        }

        redirect('/error');
    }   
}