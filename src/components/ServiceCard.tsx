import type { ButtonHTMLAttributes } from 'react'
import Tag from './Tag'
import '../styles/ServiceCard/ServiceCard.css'

export type ServiceCardProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> & {
  title?: string
  description?: string
  price?: string
  tags?: string[]
  state?: 'Default' | 'Selected'
}
export default function ServiceCard({ title = 'Flat tyre repair', description = 'Tube or tyre swap, any wheel size.', price = '€15', tags = ['30 min'], state = 'Default', className = '', type = 'button', ...props }: ServiceCardProps) {
  return <button {...props} type={type} aria-pressed={state === 'Selected'} className={`service-card service-card--${state.toLowerCase()} ${className}`}>
    <span className="service-card__header"><span className="service-card__title">{title}</span><span className="service-card__price">{price}</span></span>
    <span className="service-card__description">{description}</span>
    <span className="service-card__tags">{tags.map((tag, index) => <Tag key={`${tag}-${index}`} label={tag} />)}</span>
  </button>
}
