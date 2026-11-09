import chevronLeft from '../assets/chevron-left.svg'
import '../styles/TopBar/TopBar.css'

export type TopBarProps = { title?: string; step?: string; onBack?: () => void; className?: string }
export default function TopBar({ title = 'Book a repair', step = 'Step 1 of 3', onBack, className = '' }: TopBarProps) {
  return <header className={`top-bar ${className}`}>
    <button className="top-bar__back" type="button" aria-label="Go back" onClick={onBack}><img src={chevronLeft} alt="" width="24" height="24" /></button>
    <h1 className="top-bar__title">{title}</h1>
    <span className="top-bar__step">{step}</span>
  </header>
}
