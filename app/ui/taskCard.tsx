import { TaskProps } from "@/app/type/taskType"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export type TaskAction = {
    onToggle: (_id: string, completed: boolean) => void,
    onEdit: (_id: string) => void,
    onDelete: (_id: string) => void
}

type TaskCardProps = TaskAction & {
    task: TaskProps,
} 




export const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
    return (
        <div className="flex items-center justify-between border border-(--foreground) rounded-lg p-4 capitalize">
            <div className="flex items-center justify-between gap-2">
                <input className="accent-(--foreground) " type="checkbox" checked={task.completed} onChange={(e) => { onToggle(task._id, e.target.checked) }} />

                <p className={`${task.completed ? "line-through" : ""}`}>{task.task}</p>
            </div>

            <div className="flex items-center justify-between gap-2">
                <FaRegEdit className="text-(--foreground) cursor-pointer" onClick={() => { onEdit(task?._id) }} />
                <MdDelete className="text-red-500 cursor-pointer" onClick={() => { onDelete(task?._id) }} />
            </div>
        </div>
    )
}