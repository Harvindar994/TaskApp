import { NextRequest, NextResponse } from "next/server";
import auth from "@/app/config/auth";

export async function GET(request: NextRequest) {
    try {
        const user = await auth.getUser();

        if (user) {
            return NextResponse.json({
                name: user.name,
                email: user.email,
                avatar: null
            }, { status: 200 })
        }
        else {
            request.cookies.delete('session');
            return NextResponse.json(null, {
                status: 404
            })
        }

    } catch (error) {
        request.cookies.delete('session');
        return NextResponse.json({
            error: error
        }, {
            status: 404
        })
    }
}

export async function DELETE() {
    auth.deleteSession();
    return NextResponse.json({
        message: "User Logged Out."
    }, {
        status: 200
    })
}