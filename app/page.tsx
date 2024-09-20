"use client";
import { ListItem } from "./component/listItem";
import { Button } from "@/components/ui/button";
import { TaskForm } from "./component/taskForm";
import { useTaskForm } from "./states/noteForm";
import { useTasks } from "./states/notes";
import { TaskType } from "./types/task";
import { ThemeToggle } from "./component/themeToggle";
import { Divide } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

export default function Home() {
  const { setActive } = useTaskForm();
  const { notes, initNotes } = useTasks();

  useEffect(() => {
    initNotes();
  }, []);

  return (
    <div className="w-full flex-1 flex justify-center items-center p-3 relative">
      <div className="border rounded-xl notes">
        <div className="p-4 border-b flex justify-between items-center">
          <p>Tasks</p>
          <div className="flex gap-3">
            <ThemeToggle />
            <Button
              onClick={() => {
                setActive(true);
              }}
            >
              Create Task
            </Button>
          </div>
        </div>
        <ScrollArea className="p-4 h-[450px] relative">
          <div className="flex flex-col gap-2">
            {notes.length == 0 && (
              <div className="w-full h-full absolute left-0 top-0 text-gray-300 flex justify-center items-center">
                There are no Tasks
              </div>
            )}
            {notes.map((task: TaskType) => {
              return (
                <ListItem
                  key={task.id}
                  id={task.id}
                  body={task.body}
                  isCompleted={task.isCompleted}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <TaskForm />
    </div>
  );
}
