import { create } from 'zustand';

type NoteFormState = {
    isActive: boolean;
    body: string;
    isCreating: boolean;
    setActive: (state: boolean) => void;
    handleOnChange: (event) => void;
    clear: () => void;
    setCreating: (status: boolean) => void;
}

const useTaskForm = create<NoteFormState>()((set) => ({
    isActive: false,
    body: "",
    isCreating: false,

    setCreating: (status) => {
        set({ isCreating: status })
    },

    setActive: (new_state) => set({ isActive: new_state }),

    clear: () => {
        set({ body: "", isCreating: false });
    },

    handleOnChange: (event) => {
        set({ body: event.target.value });
    }
}))

export { useTaskForm };