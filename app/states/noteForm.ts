import { ReactEventHandler } from 'react';
import { create } from 'zustand';

type NoteFormState = {
    isActive: boolean;
    body: string;
    isCreating: boolean;
    setActive: (state: boolean) => void;
    handleOnChange: (event: any) => void;
    clear: () => void;
    setCreating: (status: boolean) => void;
}

const useTaskForm = create<NoteFormState>()((set) => ({
    isActive: false,
    body: "",
    isCreating: false,

    setCreating: (status) => {
        set((state) => ({ isCreating: status }))
    },

    setActive: (new_state) => set((state) => ({ isActive: new_state })),

    clear: () => {
        set((state) => ({ body: "", isCreating: false }));
    },

    handleOnChange: (event) => {
        set((state) => ({ body: event.target.value }));
    }
}))

export { useTaskForm };