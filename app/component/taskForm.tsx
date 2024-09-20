import * as React from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { useTaskForm } from "../states/noteForm";
import { useTasks } from "../states/notes";

export function TaskForm() {
  const {
    body,
    handleOnChange,
    setActive,
    isActive,
    clear,
    setCreating,
    isCreating,
  } = useTaskForm();
  const { addNote } = useTasks();

  async function handleCreate() {
    if (body.length == 0) {
      clear();
      return;
    }

    if (body.length > 200) {
      toast.error("Task must be less than 200 characters");
      return;
    }

    try {
      setCreating(true);
      const response = await axios.post("/api/v1/task", { body });
      addNote(response.data);
      clear();
      toast.success("Task successfully created", {
        description: response.data.body,
      });
    } catch (error) {
      console.log(error.status);
      toast.error("Unable to create task at the moment");
    }

    setCreating(false);
  }

  if (isActive) {
    return (
      <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center backdrop-blur">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Task</CardTitle>
            <CardDescription>
              Create your new task in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Task</Label>
                  <Input
                    value={body}
                    onChange={handleOnChange}
                    id="name"
                    placeholder="Type you task here"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setActive(false);
              }}
            >
              Close
            </Button>
            <Button onClick={handleCreate}>
              {isCreating && (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              )}
              {!isCreating && "Create"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  } else {
    return null;
  }
}
