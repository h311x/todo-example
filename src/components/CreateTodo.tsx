import type {FC} from 'react'
import Dialog from "./ui/Dialog";
import {useReducer} from "react";
import {api} from "../utils/api";
import type {Todo} from ".prisma/client";

type Props = {
	isOpen: boolean
	setIsOpen: (arg: boolean) => void
}

const CreateTodo: FC<Props> = ({isOpen, setIsOpen}) => {
	const [formState, dispatch] = useReducer((state: Omit<Todo, 'id'>, action: Partial<Omit<Todo, 'id'>>) => {
		return {...state, ...action}
	}, {
		title: '',
		description: ''
	})
	const createTodo = api.todo.createTodo.useMutation()
	const utils = api.useContext()

	const onSave = async () => {
		await createTodo.mutateAsync(formState, {
			onSuccess: () => {
				utils.todo.getTodoList.invalidate().catch(e => console.error(e))
			},
		})
	}

	return (
		<Dialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title={'Create Todo'}
			formState={formState}
			setFormState={dispatch}
			onSave={onSave}
		/>
	)
}

export default CreateTodo