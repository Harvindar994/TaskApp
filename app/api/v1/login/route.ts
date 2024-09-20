import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, createSessionClient } from "@/app/config/nodeAppwrite";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {

    const { email, password } = await request.json()

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(
        email,
        password
    );

    // fetching account details.
    const { account: session_account } = await createSessionClient(session.secret)
    const userDetails = await session_account.get()

    cookies().set("session", session.secret, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: new Date(session.expire),
        path: "/",
    });

    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.json({
        session: {
            name: userDetails.name,
            email: userDetails.email,
            avatar: null
        },
        message: "Successfully Logged in",
    }, { status: 200 })

}