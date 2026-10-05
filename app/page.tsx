"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/app/ui/button"
import { TaskProps } from '@/app/type/taskType'
import { TaskList } from '@/app/ui/taskList'

export default function Home() {

  const [task, setTask] = useState({
    task: "",
    completed: false
  })
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)


  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/tasks")
      if (!response.ok) {
        throw new Error("Unable to fetch tasks")
      }
      const data: { task: TaskProps[] } = await response.json()
      setTasks(data.task)
      console.log("Data from server:", data.task)
    } catch (error: any) {
      setError(error.message || "unknown error occurred")
    }
  }


  useEffect(() => {
    fetchTasks()
  }, [])

  if (!tasks) return <p>No Product Found</p>
  if (error) return <p>Error: {error}</p>

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updatedTask = {
      task: task.task,
      completed: task.completed
    }

    if (editingId) {
      const response = await fetch(`http://localhost:5000/api/v1/tasks/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
      })
      if (!response.ok) {
        throw new Error("Unable to Update task")
      }
      const data: { task: TaskProps } = await response.json()
      setTasks((prevTask) => prevTask.map((task) => task._id === editingId ? data.task : task))
      setEditingId(null)
      setTask({
        task: "",
        completed: false
      })
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/v1/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedTask)
        })
        if (!response.ok) {
          throw new Error("Unable to add task")
        }
        const data: { task: TaskProps } = await response.json()

        setTasks((prevTasks) => [data.task, ...prevTasks])
      } catch (error: any) {
        console.log(error.message || "unknown error occured")
      }

      setTask({
        task: "",
        completed: false
      })
    }
  }

  async function handleDelete(_id: string) {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tasks/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw new Error("unable to delete task")
      }


      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id))
    } catch (error: any) {
      console.log(error.message || "unknown error occured")
    }
  }

  function handleEdit(_id: string) {
    const taskToEdit = tasks.find((task) => task._id === _id)
    if (!taskToEdit) return null
    setTask({
      task: taskToEdit.task,
      completed: taskToEdit.completed
    })
    setEditingId(_id)
  }

  async function handleToggle(_id: string, completed: boolean) {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tasks/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed })
      })
      if (!response.ok) {
        throw new Error("unable to update checkbox")
      }

      const data: { task: TaskProps } = await response.json()
      setTasks((prevTask) => prevTask.map((task) => task._id === _id ? data.task : task))
    } catch (error: any) {
      console.log(error.message || "unknown error occured")
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center font-sans max-w-6xl mx-auto p-5">
      <main>
        <div className="flex flex-col justify-center items-center mt-20 gap-4 border-2 border-(--foreground) p-5 rounded-sm bg-(--background) ring">
          <h1 className="text-2xl uppercase font-bold ">Task Manager</h1>
          <form onSubmit={handleSubmit}>
            <input className="border border-(--foreground) px-4 py-2 rounded-sm mr-2 outline-none placeholder:text-(--foreground)" type="text" placeholder='e.g wash plate' value={task.task} onChange={(e) => setTask({ ...task, task: e.target.value })} />
            <Button type="submit">{editingId ? "Update" : "Submit"}</Button>
          </form>
        </div>
        <ul>
          <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} onToggle={handleToggle} />
        </ul>
        <div>
        </div>
      </main>
    </div>
  );
}
