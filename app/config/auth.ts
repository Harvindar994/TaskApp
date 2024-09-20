import { cookies } from "next/headers";
import { createSessionClient } from "./nodeAppwrite";
import { UserType } from "../types/user";

type SessionCookie = { value: string; name: string };

const auth = {
    user: null,
    sessionCookie: null,

    getUser: async (): Promise<UserType | null> => {
        auth.sessionCookie = cookies().get('session') as SessionCookie;

        try {
            const { account } = await createSessionClient(auth.sessionCookie.value);
            auth.user = await account.get();

        } catch (error) {
            console.log(error);
            auth.user = null;
            auth.sessionCookie = null;
        }

        return auth.user;
    },

    deleteSession: async () => {
        auth.sessionCookie = cookies().get('session');

        try {
            const { account } = await createSessionClient(auth.sessionCookie.value);
            await account.deleteSession('current');
        } catch (error) {

            console.log(error);

        }

        cookies().delete('session');
        auth.user = null;
        auth.sessionCookie = null;
    }
}

export default auth;