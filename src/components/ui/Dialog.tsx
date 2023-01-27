import type {FC} from 'react'
import {Dialog as HDialog} from '@headlessui/react'
import Field from "./Field";
import Textarea from "./Textarea";
import Button from "./Button";
import type {Todo} from ".prisma/client";

type Props = {
	isOpen: boolean
	setIsOpen: (arg: boolean) => void
	title: string
	onSave: () => Promise<void>
	formState: Omit<Todo, 'id'>
	setFormState: (s: Partial<Omit<Todo, 'id'>>) => void
}

const Dialog: FC<Props> = ({title, setIsOpen, isOpen, onSave, formState, setFormState}) => {
	const handleOnClose = () => {
		setIsOpen(false)
		setFormState({
			title: '',
			description: ''
		})
	}

	const handleOnSave = async () => {
		await onSave()
		handleOnClose()
	}

	return (
		<HDialog open={isOpen} onClose={() => handleOnClose()} className="relative z-50 text-violet-900">

			<div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

			<div className="fixed inset-0 flex items-center justify-center">
				<HDialog.Panel className="rounded bg-white p-6 min-w-[360px]">
					<HDialog.Title className="text-4xl font-medium mb-6">{title}</HDialog.Title>
					<div className={'flex flex-col gap-2'}>
						<form onSubmit={(e) => {
							e.preventDefault()
							handleOnSave().catch(e => console.error(e))
						}}>
							<div className='flex flex-col gap-4'>
								<Field
									value={formState.title}
									onChange={(e) => setFormState({title: e.target.value})}
									placeholder='Add todo title'
								/>
								<Textarea
									value={formState.description}
									onChange={(e) => setFormState({description: e.target.value})}
									placeholder='Add todo description'
								/>
							</div>

							<div className="flex gap-4 mt-4">
								<Button disabled={!formState.title || !formState.description}>Save</Button>
								<Button type={'button'} variant={'secondary'} onClick={() => handleOnClose()}>Cancel</Button>
							</div>
						</form>
					</div>
				</HDialog.Panel>
			</div>
		</HDialog>
	)
}

export default Dialog