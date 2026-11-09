import '../styles/Tag/Tag.css'

export type TagProps = { label?: string; className?: string }
export default function Tag({ label = '30 min', className = '' }: TagProps) {
  return <span className={`spoke-tag ${className}`}>{label}</span>
}
