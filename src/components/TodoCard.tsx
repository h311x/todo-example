import type {FC} from 'react'
import type {Todo} from ".prisma/client";
import {api} from "../utils/api";

type Props = {
	onEdit: (todo: Todo) => void
} & Todo

const TodoCard: FC<Props> = ({id, title, description, onEdit}) => {
	const deleteTodo = api.todo.deleteTodo.useMutation()
	const utils = api.useContext()

	const handleDelete = () => {
		deleteTodo.mutate({id}, {
			onSuccess: () => {
				utils.todo.getTodoList.invalidate().catch(e => console.error(e))
			},
		})
	}

	return (
		<div className="flex flex-col border-2 border-violet-900 rounded-lg p-4">
			<div className="flex justify-between">
				<h4 className="text-2xl mb-2">{title}</h4>

				<div className="flex gap-4 items-center">
					<svg onClick={() => onEdit({id, title, description})} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 cursor-pointer">
						<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
					</svg>


					<svg onClick={() => handleDelete()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
						<path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
					</svg>
				</div>
			</div>

			<p className="flex flex-col">
				<span className="text-sm">Description:</span>
				<span>
					{description}
				</span>
			</p>
		</div>
	)
}

export default TodoCard