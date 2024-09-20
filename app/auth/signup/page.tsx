"use client";

import Link from "next/link";

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
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSignup } from "@/app/states/signup";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [creatingAccount, setCreatingAccount] = useState(false);
  const router = useRouter();

  const {
    firstName,
    lastName,
    email,
    password,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onPasswordChange,
    clear,
  } = useSignup();

  async function Signup() {
    if (creatingAccount) {
      return;
    }

    if (firstName == "" || lastName == "" || email == "" || password == "") {
      toast.error("Please fill all the details");
      return;
    }

    if (password.length < 8 || password.length > 265) {
      toast.warning("Password must be between 8 and 265 characters long");
      return;
    }

    setCreatingAccount(true);
    try {
      const response = await axios.post("/api/v1/signup/", {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      switch (response.status) {
        case 200:
          toast.success("Account created successfully");
          router.push("/auth/login");
          clear();
          break;

        default:
          toast.error("Failed to create account");
          break;
      }
    } catch (error: any) {
      switch (error.status) {
        case 409:
          toast.error("A user with the same email already exists.");
          break;

        default:
          toast.error("Unable to create account");
          break;
      }
    }
    setCreatingAccount(false);
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  value={firstName}
                  onChange={onFirstNameChange}
                  id="first-name"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  value={lastName}
                  onChange={onLastNameChange}
                  id="last-name"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={onEmailChange}
                id="email"
                type="email"
                placeholder="example@brightgoal.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                onChange={onPasswordChange}
                id="password"
                type="password"
              />
            </div>
            <Button onClick={Signup} className="w-full">
              {creatingAccount && (
                <p className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </p>
              )}
              {!creatingAccount && "Create an account"}
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
