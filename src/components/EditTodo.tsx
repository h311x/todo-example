import type {FC} from 'react'
import Dialog from "./ui/Dialog";
import {useReducer} from "react";
import {api} from "../utils/api";
import type {Todo} from ".prisma/client";

type Props = {
	setIsOpen: () => void,
	todo: Todo
}

const EditTodo: FC<Props> = ({setIsOpen, todo}) => {
	const [formState, dispatch] = useReducer((state: Omit<Todo, 'id'>, action: Partial<Omit<Todo, 'id'>>) => {
		return {...state, ...action}
	}, {
		title: todo.title,
		description: todo.description
	})
	const editTodo = api.todo.editTodo.useMutation()
	const utils = api.useContext()

	const onSave = async () => {
		await editTodo.mutateAsync({id: todo.id, ...formState}, {
			onSuccess: () => {
				utils.todo.getTodoList.invalidate().catch(e => console.error(e))
			},
		})
	}
	return (
		<Dialog
			isOpen={true}
			setIsOpen={setIsOpen}
			title={'Edit Todo'}
			formState={formState}
			setFormState={dispatch}
			onSave={onSave}
		/>
	)
}

export default EditTodo