import Button from './Button'
import type { ButtonProps } from './Button'
import '../styles/ActionBar/ActionBar.css'

export type ActionBarProps = Omit<ButtonProps, 'variant'> & { className?: string }
export default function ActionBar({ className = '', ...buttonProps }: ActionBarProps) {
  return <footer className={`action-bar ${className}`}><Button {...buttonProps} /></footer>
}
