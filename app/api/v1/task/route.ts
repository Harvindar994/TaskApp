// import { database } from "@/app/config/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "appwrite";
import { createSessionClient } from "@/app/config/nodeAppwrite";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {

    try {
        const sessionCookie = cookies().get('session');
        const { database, account } = await createSessionClient(sessionCookie?.value);

        const { body } = await request.json()

        // let's fetch user email;
        const user = await account.get();

        const response = await database.createDocument(
            String(process.env.APPWRITE_DATABASE_ID!),
            String(process.env.APPWRITE_TASKS_COLLECTION_ID!),
            ID.unique(),
            {
                body,
                owner: user.email
            }
        );

        return Response.json({

            id: response.$id,
            body: response.body,
            isCompleted: false,

        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return Response.json({
            error: "Unable to create Task."
        })
    }

}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json(); // Parse the incoming JSON body

        const sessionCookie = cookies().get('session');
        const { database } = await createSessionClient(sessionCookie?.value);

        const response = await database.updateDocument(
            String(process.env.APPWRITE_DATABASE_ID!),
            String(process.env.APPWRITE_TASKS_COLLECTION_ID!),
            String(body.id),
            {
                ...body.update
            }
        );

        return NextResponse.json({
            message: "Tasks successfully updated.",
            response
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Unable to update the task at the moment."
        }, { status: 400 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json(); // Parse the request body as JSON

        const sessionCookie = cookies().get('session');
        const { database } = await createSessionClient(sessionCookie?.value);

        const response = await database.deleteDocument(
            String(process.env.APPWRITE_DATABASE_ID!),
            String(process.env.APPWRITE_TASKS_COLLECTION_ID!),
            String(body.id)
        );

        return NextResponse.json({
            message: "Task deleted successfully",
            response,
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Unable to delete the task.",
        }, { status: 400 })

    }
}

export async function GET() {

    try {
        const sessionCookie = cookies().get('session');
        const { database, account } = await createSessionClient(sessionCookie?.value);

        // let's fetch user email;
        const user = await account.get();

        const response = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_TASKS_COLLECTION_ID!,
            [
                Query.equal('owner', user.email)
            ]
        );

        return NextResponse.json({
            length: response.total,
            tasks: response.documents
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Unable to fetch the tasks at the moment."
        }, { status: 400 })
    }

}