import type {ButtonHTMLAttributes, FC, PropsWithChildren} from "react";
import type {VariantProps} from "class-variance-authority";
import {cva} from "class-variance-authority";

const button = cva(['cursor-pointer','outline-none', 'uppercase', 'font-medium', 'text-white', 'py-2', 'px-4', 'transition-all', 'rounded-lg', 'hover:shadow-lg', 'focus:shadow-lg', 'shadow-purple-900'], {
	variants: {
		variant: {
			primary: ['from-indigo-400', 'to-violet-600', 'bg-gradient-to-r',],
			secondary: ['bg-slate-200', 'text-violet-900'],
		},
		disabled: {
			true: ['grayscale', 'from-slate-200', 'to-slate-200', 'text-violet-900', 'hover:shadow-none', 'cursor-not-allowed']
		},
	},
	defaultVariants: {
		variant: 'primary'
	}
})

type ButtonProps = VariantProps<typeof button>

const Button: FC<PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({
	children,
	variant,
	disabled,
	...params
}) => {
	return <button className={button({variant, disabled})} disabled={disabled} {...params}>{children}</button>
}

export default Button