export type ContactField = 'name' | 'phone'
export type ContactErrors = Partial<Record<ContactField, string>>

export function validateContactField(field: ContactField, value: string): string | undefined {
  const trimmed = value.trim()
  if (field === 'name') return trimmed ? undefined : 'Enter your name.'
  if (!trimmed) return 'Enter your phone number.'
  const digits = trimmed.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15 && /^\+?[\d\s().-]+$/.test(trimmed)
    ? undefined
    : 'Enter a valid phone number.'
}
