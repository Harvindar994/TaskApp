import { cookies } from "next/headers";
import { createSessionClient } from "./nodeAppwrite";
import { UserType } from "../types/user";

type SessionCookie = { value: string; name: string };

const auth = {
    user: null,
    sessionCookie: null,

    getUser: async (): Promise<UserType | null> => {
        try {
            auth.sessionCookie = cookies().get('session') as SessionCookie;
            if (auth.sessionCookie && auth.sessionCookie.value) {
                const { account } = await createSessionClient(auth.sessionCookie.value);
                auth.user = await account.get();
            }
            else {
                auth.user = null;
                auth.sessionCookie = null;
            }

        } catch (error) {
            console.log(error);
            auth.user = null;
            auth.sessionCookie = null;
        }

        return auth.user;
    },

    deleteSession: async () => {
        try {
            auth.sessionCookie = cookies().get('session') as SessionCookie;
            if (auth.sessionCookie && auth.sessionCookie.value) {
                const { account } = await createSessionClient(auth.sessionCookie.value);
                await account.deleteSession('current');
            }
        } catch (error) {
            console.log("Error While Deleting Session: ", error);
        }
        cookies().set("session", null, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(),
            path: "/",
        });
        auth.user = null;
        auth.sessionCookie = null;
    }
}

export default auth;