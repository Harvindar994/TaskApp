"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/states/session";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/app/states/login";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function Login() {
  const router = useRouter();
  const { onEmailChange, onPasswordChange, email, password } = useLogin();
  const { setSession } = useSession();
  const [gettingLogin, setGettingLogin] = useState(false);

  const login = async () => {
    if (gettingLogin) {
      return;
    }

    if (email == "" || password == "") {
      toast.warning("Please enter your credentials");
      return;
    }

    setGettingLogin(true);
    try {
      const response = await axios.post("/api/v1/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log();
        const { name, email, avatar } = response.data.session;
        setSession(email, name, avatar);
        router.push("/");
        toast.success("Successfully logged in");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message); // Type-safe access to Error properties
      }
      toast.error("Invalid user or password");
    }
    setGettingLogin(false);
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder="example@brightgoal.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                value={password}
                onChange={onPasswordChange}
                id="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={login}>
              {gettingLogin && (
                <p className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </p>
              )}
              {!gettingLogin && "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup/" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
