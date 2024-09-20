import { cookies } from "next/headers";
import { createSessionClient } from "./nodeAppwrite";
import { redirect } from "next/navigation";

type SessionCookie = { value: string; name: string };

const auth = {
    user: null,
    sessionCookie: null,

    getUser: async () => {
        auth.sessionCookie = cookies().get('session') as SessionCookie;

        try {
            const { account } = await createSessionClient(auth.sessionCookie.value);
            auth.user = await account.get();

        } catch (error) {

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
        } catch (error) { }

        cookies().delete('session');
        auth.user = null;
        auth.sessionCookie = null;
    }
}

export default auth;