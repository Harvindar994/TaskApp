import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/app/config/nodeAppwrite";

export async function GET(request: NextRequest) {

    const { account } = await createAdminClient();

    const respose = await account.createOAuth2Token(
        "google",
        "http://localhost:3000/",
        "http://localhost:3000/auth/signup"
    );

    return NextResponse.json({
        loginURL: respose
    }, {
        status: 200,
    })
}