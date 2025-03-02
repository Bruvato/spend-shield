"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { uniqueNamesGenerator, names } from "unique-names-generator";

export async function selectUsername(formData: FormData) {
    const supabase = await supabaseServer();
    const name = formData.get("username") as string;
    const id = (await supabase.auth.getUser()).data?.user?.id;
    const {data, error} = await supabase.from("users").insert({
        "id": id,
        "username" : name
    }).select();  

    console.log(data);

    if (error) {
        console.log("ah shucks");
        console.log((await supabase.auth.getUser()).data?.user?.role);
        console.log(error);
        redirect("/error");
    }

    for (let i = 0; i < 25; i++) {
        const name = uniqueNamesGenerator({dictionaries: [names]});
        const e2 = await supabase.from("transactions").insert({
            "purchaser": (await supabase.auth.getUser()).data?.user?.id,
            "seller": name,
            "value": Math.trunc(Math.random() * 100000) / 100,
        })
    }
    
    redirect("/");
}