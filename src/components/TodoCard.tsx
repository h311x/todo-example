import type {FC} from 'react'
import type {Todo} from ".prisma/client";

type Props = Todo

const TodoCard: FC<Props> = ({id, title, description}) => {
	return (
		<div className="flex flex-col border-2 border-violet-900 rounded-lg p-4">
			<h4 className="text-2xl mb-2">{title}</h4>
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