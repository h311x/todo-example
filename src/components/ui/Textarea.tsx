import type {FC} from 'react'
import type {TextareaHTMLAttributes} from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea: FC<Props> = (props) => {
	return (<textarea className="outline-none border-2 border-violet-900 rounded-lg py-2 px-2 resize-none" {...props}/>)
}

export default Textarea