import { Client, Databases, Account, Users } from "node-appwrite";

const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_API_KEY!)

    return {
        get users() {
            return new Users(client)
        },
        get account() {
            return new Account(client)
        },
        get database() {
            return new Databases(client)
        }
    }
}

const createSessionClient = async (session) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)

    if (session) {
        client.setSession(session);
    }

    return {
        get users() {
            return new Users(client)
        },
        get account() {
            return new Account(client)
        },
        get database() {
            return new Databases(client)
        }
    }
}

export { createAdminClient, createSessionClient };