import { create } from 'zustand';
import { TaskType } from '../types/task';
import axios from "axios";


type TasksState = {
    notes: TaskType[];
    addNote: (note: TaskType) => void;
    setTaskCompleted: (id: string, new_state: boolean) => void;
    deleteTask: (id: string) => void;
    initNotes: () => void;
    clearTask: () => void;
}

const useTasks = create<TasksState>()((set) => ({
    notes: [],

    addNote: async (note) => {
        set((state) => ({ notes: [note, ...state.notes] }));
    },

    setTaskCompleted: (id, new_state) => {
        set((state) => ({
            notes: state.notes.map((task: TaskType) => {
                if (task.id == id) {
                    return { ...task, isCompleted: new_state }
                }
                return task
            })
        }));
    },

    deleteTask: (id) => {
        set((state) => ({
            notes: state.notes.filter((task: TaskType) => {
                if (task.id == id) {
                    return false;
                }
                return true;
            })
        }));
    },

    initNotes: async () => {
        const respose = await axios.get("/api/v1/task");

        var taks = []

        set((state) => ({
            notes: respose.data.tasks.reverse().map((task: any) => {
                return {
                    id: task.$id,
                    body: task.body,
                    isCompleted: task.completed
                }
            })
        }));
    },

    clearTask: () => {
        set({ notes: [] });
    }

}));

export { useTasks };