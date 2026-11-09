export const days = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'mon-16', label: 'Mon 16' },
] as const

export const times = [
  { label: '09:00', disabled: true },
  { label: '10:30', disabled: true },
  { label: '12:00', disabled: false },
  { label: '14:00', disabled: false },
  { label: '16:30', disabled: false },
  { label: '17:30', disabled: false },
] as const
