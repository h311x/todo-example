import type {FC} from 'react'
import Field from "./ui/Field";
import Textarea from "./ui/Textarea";
import Dialog from "./ui/Dialog";
import {useState} from "react";
import {api} from "../utils/api";
import Button from "./ui/Button";
import type {Todo} from ".prisma/client";

type Props = {
	setIsOpen: () => void,
	todo: Todo
}

const EditTodo: FC<Props> = ({setIsOpen, todo}) => {
	const [title, setTitle] = useState(todo?.title)
	const [description, setDescription] = useState(todo?.description)
	const editTodo = api.todo.editTodo.useMutation()
	const utils = api.useContext()

	const onSave = (cb: () => void) => {
		editTodo.mutate({id: todo.id, title, description}, {
			onSuccess: () => {
				utils.todo.getTodoList.invalidate().catch(e => console.error(e))
			},
			onSettled: () => {
				cb()
			}
		})
	}
	return (
		<Dialog
			isOpen={true}
			setIsOpen={setIsOpen}
			title={'Edit Todo'}
			onClose={() => {
				setTitle('')
				setDescription('')
			}}>
			{
				({close}) => (
					<div className={'flex flex-col gap-2'}>
						<form onSubmit={(e) => {
							e.preventDefault()
							onSave(close)
						}}>
							<div className='flex flex-col gap-4'>
								<Field value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Add todo title'/>
								<Textarea value={description} onChange={(e) => setDescription(e.target.value)}
													placeholder='Add todo description'/>
							</div>

							<div className="flex gap-4 mt-4">
								<Button disabled={!title || !description}>Save</Button>
								<Button type={'button'} variant={'secondary'} onClick={() => close()}>Cancel</Button>
							</div>
						</form>
					</div>
				)
			}
		</Dialog>
	)
}

export default EditTodo