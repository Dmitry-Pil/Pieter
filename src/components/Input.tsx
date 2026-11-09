import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import '../styles/Input/Input.css'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  state?: 'Default' | 'Focus' | 'Error'
  errorMessage?: string
  className?: string
}

export default function Input({
  label = 'Your name',
  placeholder = 'First and last name',
  state = 'Default',
  errorMessage,
  className = '',
  id,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const isError = state === 'Error' || Boolean(errorMessage)
  const message = isError ? errorMessage || 'Enter a valid value.' : undefined
  const errorId = `${inputId}-error`
  const descriptionIds = [describedBy, message ? errorId : undefined].filter(Boolean).join(' ') || undefined

  return <div className={`spoke-input spoke-input--${isError ? 'error' : state.toLowerCase()} ${className}`}>
    <label className="spoke-input__label" htmlFor={inputId}>{label}</label>
    <input {...props} className="spoke-input__field" id={inputId} placeholder={placeholder} aria-invalid={isError ? true : ariaInvalid} aria-describedby={descriptionIds} />
    {message && <p className="spoke-input__error" id={errorId} role="alert">{message}</p>}
  </div>
}
