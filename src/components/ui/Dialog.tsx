import type {FC, ReactNode} from 'react'
import {Dialog as HDialog} from '@headlessui/react'

type Props = {
	isOpen: boolean
	setIsOpen: (arg: boolean) => void
	title: string
	onClose: () => void
	children: (params: {close: (() => void)}) => ReactNode
}

const Dialog: FC<Props> = ({children, title, setIsOpen, isOpen}) => {
	const handleOnClose = () => {
		setIsOpen(false)
	}

	return (
		<HDialog open={isOpen} onClose={() => handleOnClose()} className="relative z-50 text-violet-900">
			{/* The backdrop, rendered as a fixed sibling to the panel container */}
			<div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

			<div className="fixed inset-0 flex items-center justify-center">
				<HDialog.Panel className="rounded bg-white p-6 min-w-[360px]">
					<HDialog.Title className="text-4xl font-medium mb-6">{title}</HDialog.Title>
					{children({close: handleOnClose})}
				</HDialog.Panel>
			</div>
		</HDialog>
	)
}

export default Dialog