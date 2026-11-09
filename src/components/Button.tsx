import type { ButtonHTMLAttributes } from 'react'
import '../styles/Button/Button.css'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
  variant?: 'Primary' | 'Secondary'
}

export default function Button({ label = 'Book this repair', variant = 'Primary', className = '', type = 'button', children, ...props }: ButtonProps) {
  return <button {...props} type={type} className={`spoke-button spoke-button--${variant.toLowerCase()} ${className}`}>{children ?? label}</button>
}
