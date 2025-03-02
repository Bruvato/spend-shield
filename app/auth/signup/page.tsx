"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "../loginActions";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  console.log(params);
  return (
    <div className="flex flex-row w-full h-screen justify-center items-center">
      <form
        action={signup}
        className="flex flex-col w-96 justify-center items-center rounded-3xl py-5 px-9 space-y-3 border"
      >
        <h1 className="text-3xl">Sign up</h1>
        {params.get("error") != null && <p>Invalid credentials.</p>}
        <div className="self-start ml-1">
          <Label htmlFor="email">Email</Label>
        </div>
        <Input
          id="email"
          type="email"
          name="email"
          required
          placeholder="raymond@northeast.com"
        />
        <div className="self-start ml-1 mt-2">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input
          id="password"
          type="password"
          name="password"
          required
          placeholder="Ha1Ha2Ha3Ha4"
        />
        <div className="pt-3">
          <Button type="submit" size="lg">
            Sign up
          </Button>
        </div>
        <div className="pt-1 pb-3">
          <p>
            Have an account?{" "}
            <a
              href="/auth/login"
              className="text-primary underline underline-offset-4"
            >
              Click here.
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
