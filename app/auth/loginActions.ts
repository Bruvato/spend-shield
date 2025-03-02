'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { supabaseServer } from "../../lib/supabase/server"
import { isAuthApiError, isAuthError } from "@supabase/supabase-js";

export async function login(formData: FormData) {
    const supabase = await supabaseServer();
    console.log("login", formData);
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const error = await supabase.auth.signInWithPassword(data);
    console.log(error.error === null);
    if (error.error) {
        redirect(`/auth/login?error=${error.error?.name}`);
    }
    revalidatePath("/", "layout");
    redirect("/");
}

export async function signup(formData: FormData) {
    console.log("this code runs on server")
    const supabase = await supabaseServer();
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const error = await supabase.auth.signUp(data);
    if (error.error) redirect(`/auth/signup?error=${error.error?.name}`);
    redirect("/auth/signup/remindconfirm");
}