import { NextRequest, NextResponse } from "next/server";
import auth from "./app/config/auth";

export async function middleware(request: NextRequest) {
    let user = null;

    try {
        user = await auth.getUser();
    } catch (error) {
        console.log("Couldn't find the user");
    }

    const currentPath = new URL(request.url).pathname;

    if (!user) {
        request.cookies.delete('session');

        if (currentPath != "/auth/login") {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }
    else {
        if (currentPath == "/auth/login") {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/", "/auth/login", "/api/v1/task"
    ]
}