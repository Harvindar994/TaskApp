import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { TaskType } from "../types/task";
import clsx from "clsx";
import axios from "axios";
import { toast } from "sonner";

import { useTasks } from "../states/notes";

export function ListItem(task: TaskType) {
  const { setTaskCompleted, deleteTask } = useTasks();
  const [deletingTask, setDeletingTask] = useState(false);
  const [updatingTask, setupdatingTask] = useState(false);

  async function handleCompleted() {
    if (updatingTask) {
      return;
    }

    // here upding the notes.
    setupdatingTask(true);
    try {
      const response = await axios.patch(`/api/v1/task`, {
        id: task.id,
        update: {
          completed: !task.isCompleted,
        },
      });

      if (response.status === 200) {
        toast.success("Task Successfully Updated.");
        setTaskCompleted(task.id, !task.isCompleted);
      } else {
        toast.error("Unable to update task at the moment.");
      }
    } catch (error: any) {
      console.log(error.status);
      toast.error("Unable to update task at the moment.");
    }
    setupdatingTask(false);
  }

  async function handleDelete(event: React.MouseEvent) {
    event.stopPropagation();

    if (deletingTask) {
      return;
    }

    // here deleting the notes.
    setDeletingTask(true);
    try {
      const response = await axios.delete(`/api/v1/task`, {
        headers: {
          "Content-Type": "application/json", // Explicitly set the content type
        },
        data: {
          id: String(task.id),
        },
      });

      if (response.status === 200) {
        toast.success("Task Successfully Deleted.");
        deleteTask(task.id);
      } else {
        toast.error("Unable to delete task at the moment.");
      }
    } catch (error: any) {
      console.log(error.status);
      toast.error("Unable to delete task at the moment.");
    }
    setDeletingTask(false);
  }

  return (
    <div
      onClick={handleCompleted}
      className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 text-gray-950 justify-between"
    >
      <p
        className={String(
          clsx(task.isCompleted && "line-through", "cursor-pointer")
        )}
      >
        {task.body}
      </p>
      <div className="flex justify-center items-center">
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          {deletingTask && <Loader2 className="h-4 w-4 animate-spin" />}
          {!deletingTask && <Trash2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
