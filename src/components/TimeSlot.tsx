import type { ButtonHTMLAttributes } from 'react'
import '../styles/TimeSlot/TimeSlot.css'

export type TimeSlotProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
  state?: 'Default' | 'Selected' | 'Disabled'
}
export default function TimeSlot({ label = '16:30', state = 'Default', disabled, className = '', type = 'button', ...props }: TimeSlotProps) {
  return <button {...props} type={type} disabled={disabled || state === 'Disabled'} aria-pressed={state === 'Selected'} className={`time-slot time-slot--${state.toLowerCase()} ${className}`}>{label}</button>
}
