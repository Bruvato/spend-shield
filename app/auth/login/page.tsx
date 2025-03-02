"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../loginActions";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const params = useSearchParams();
  // console.log(params);
  return (
    <Suspense>
      <div className="flex flex-row w-full h-screen justify-center items-center">
        <form
          action={login}
          className="flex flex-col w-96 justify-center items-center rounded-3xl py-5 px-9 space-y-3 border"
        >
          <h1 className="text-3xl">Login</h1>
          {params.get("error") != null && (
            <p>{`An error occurred: ${params.get("error")}`}</p>
          )}
          <div className="self-start ml-1">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter Email"
          />
          <div className="self-start ml-1 mt-2">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            required
            placeholder="Enter Password"
          />
          <div className="pt-3">
            <Button type="submit" size="lg">
              Log in
            </Button>
          </div>
          <div className="pt-1 pb-3">
            <p>
              Don&apos;t have an account?{" "}
              <a
                href="/auth/signup"
                className="text-primary underline underline-offset-4"
              >
                Click here.
              </a>
            </p>
          </div>
        </form>
      </div>
    </Suspense>
  );
}
