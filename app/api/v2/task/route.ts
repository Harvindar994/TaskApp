import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/app/config/nodeAppwrite";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {

    try {

        const sessionCookie = cookies().get('session');
        const { database } = await createSessionClient(sessionCookie?.value);

        const { documents: tasks, total } = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_TASKS_COLLECTION_ID!
        )

        return NextResponse.json({
            tasks, total
        })

    } catch (error) {

        console.log(error);
        return NextResponse.json("Access Denied", { status: 403 })

    }

}