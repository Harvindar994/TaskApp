import { create } from 'zustand';

type LoginType = {
    email: string;
    password: string;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clear: () => void;
}

const useLogin = create<LoginType>()((set) => ({
    email: '',
    password: '',
    onEmailChange: (event) => set({ email: event.target.value }),
    onPasswordChange: (event) => set({ password: event.target.value }),
    clear: () => set({ email: '', password: '' })
}))

export { useLogin };