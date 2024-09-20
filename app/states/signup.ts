import { create } from 'zustand';

type SignupType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    onFirstNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onLastNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clear: () => void;
}

const useSignup = create<SignupType>()((set) => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    onFirstNameChange: (event) => set({ firstName: event.target.value }),
    onLastNameChange: (event) => set({ lastName: event.target.value }),
    onEmailChange: (event) => set({ email: event.target.value }),
    onPasswordChange: (event) => set({ password: event.target.value }),
    clear: () => set({ email: '', password: '', firstName: '', lastName: '' })
}))

export { useSignup };