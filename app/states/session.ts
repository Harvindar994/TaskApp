import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Session = {
    email: string;
    name: string;
    avatar: string | null;
    isAvailable: boolean;
    clear: () => void;
    setSession: (email: string, name: string, avatar: string | null) => void;
    getSession: () => { email: string, name: string, avatar: string | null } | null;
}

const useSession = create<Session>()(
    persist(
        (set, get) => ({
            email: "",
            name: "",
            avatar: "",
            isAvailable: false,

            clear: () => {
                set({
                    name: "",
                    email: "",
                    avatar: null,
                    isAvailable: false,
                })
            },

            setSession: (email, name, avatar) => {
                set({
                    email, name, avatar, isAvailable: true
                })
            },

            getSession: () => {
                const { email, name, avatar } = get();
                return { email, name, avatar };
            }

        }), { name: "task-app-session" }
    ))

export { useSession };