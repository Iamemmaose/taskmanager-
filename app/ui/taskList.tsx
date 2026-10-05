import { TaskCard, TaskAction } from "@/app/ui/taskCard"
import { TaskProps } from "@/app/type/taskType"


export type TaskListProps = {
    tasks: TaskProps[]
} & TaskAction

export const TaskList = ({ tasks, onToggle, onDelete, onEdit }: TaskListProps) => {
    return (
        <article className="flex flex-col gap-2 w-full mt-10">
                {tasks.map((task) => <TaskCard key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />)}
        </article>
    )
}