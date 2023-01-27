import type {FC, InputHTMLAttributes} from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const Field: FC<Props> = (props) => {
	return (
		<input className="outline-none border-2 border-violet-900 rounded-lg py-2 px-2" {...props} type="text"/>
	)
}

export default Field