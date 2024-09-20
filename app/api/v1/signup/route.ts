import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/app/config/nodeAppwrite";

export async function POST(request: NextRequest) {
    try {

        const { email, password, name } = await request.json();

        const { users } = await createAdminClient();

        const result = await users.create(
            ID.unique(),
            email,
            undefined,
            password,
            name,
        )

        return NextResponse.json({
            message: "Account successfully created"
        }, { status: 200 })

    } catch (error) {
        if (error.type == 'user_email_already_exists') {
            return NextResponse.json({
                message: "Email already exists"
            }, { status: 409 })
        }

        return NextResponse.json({
            error: "Unale to create account"
        }, { status: 400 })
    }
}