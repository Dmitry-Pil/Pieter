import '../styles/SummaryRow/SummaryRow.css'

export type SummaryRowProps = { label?: string; value?: string; className?: string }
export default function SummaryRow({ label = 'Service', value = 'Flat tyre repair', className = '' }: SummaryRowProps) {
  return <div className={`summary-row ${className}`}><span className="summary-row__label">{label}</span><span className="summary-row__value">{value}</span></div>
}
