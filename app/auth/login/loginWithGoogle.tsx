"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginWithGoogle = () => {
  const router = useRouter();

  async function handleLogin() {
    const respose = await axios.get("/api/v1/loginwithgoogle/");
    if (respose.status == 200) {
      router.push(respose.data.loginURL);
    }
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      Login with Google
    </Button>
  );
};

export default LoginWithGoogle;
