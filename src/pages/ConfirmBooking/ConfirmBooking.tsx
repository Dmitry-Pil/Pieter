import { useState } from 'react'
import type { FormEvent } from 'react'
import { validateContactField } from './validation'
import type { ContactErrors, ContactField } from './validation'
import TopBar from '../../components/TopBar'
import SummaryRow from '../../components/SummaryRow'
import Input from '../../components/Input'
import ActionBar from '../../components/ActionBar'
import { services } from '../../data/services'
import { days, times } from '../../data/slots'
import type { SlotSelection } from '../PickSlot/PickSlot'
import '../../styles/ConfirmBooking/ConfirmBooking.css'

export type BookingDetails = SlotSelection & { name: string; phone: string }
export type ConfirmBookingProps = {
  onConfirm?: (details: BookingDetails) => void
  onBack?: (selection: SlotSelection) => void
}

export default function ConfirmBooking({ onConfirm, onBack }: ConfirmBookingProps) {
  const params = new URLSearchParams(window.location.search)
  const service = services.find(item => item.id === params.get('service')) ?? services[0]
  const day = days.find(item => item.id === params.get('day')) ?? days[0]
  const time = times.find(item => item.label === params.get('time') && !item.disabled)?.label ?? '16:30'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<ContactErrors>({})

  function goBack() {
    const selection = { service, day: day.id, time }
    if (onBack) {
      onBack(selection)
      return
    }
    const url = new URL('/pick-slot', window.location.origin)
    url.searchParams.set('service', service.id)
    url.searchParams.set('day', day.id)
    url.searchParams.set('time', time)
    window.location.assign(url)
  }

  function updateField(field: ContactField, value: string) {
    if (field === 'name') setName(value)
    else setPhone(value)
    setMessage('')
    setErrors(current => ({ ...current, [field]: current[field] ? validateContactField(field, value) : undefined }))
  }

  function validateField(field: ContactField, value: string) {
    setErrors(current => ({ ...current, [field]: validateContactField(field, value) }))
  }

  function confirmBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = {
      name: validateContactField('name', name),
      phone: validateContactField('phone', phone),
    }
    setErrors(nextErrors)
    setMessage('')
    if (nextErrors.name || nextErrors.phone) {
      const firstInvalid = event.currentTarget.elements.namedItem(nextErrors.name ? 'name' : 'phone') as HTMLInputElement
      firstInvalid.focus()
      return
    }
    const details = { service, day: day.id, time, name: name.trim(), phone: phone.trim() }
    if (onConfirm) {
      onConfirm(details)
      return
    }
    setMessage('Demo details confirmed. No reservation has been sent.')
  }

  return <div className="confirm-booking" data-node-id="7:128">
    <TopBar className="confirm-booking__top-bar" step="Step 3 of 3" onBack={goBack} />
    <main className="confirm-booking__content">
      <form id="confirm-booking-form" className="confirm-booking__form" onSubmit={confirmBooking} noValidate>
        <h2 className="confirm-booking__title">Check and confirm</h2>
        <section className="confirm-booking__summary" aria-label="Booking summary">
          <SummaryRow className="confirm-booking__summary-row" label="Service" value={service.title} />
          <SummaryRow className="confirm-booking__summary-row" label="Drop-off" value={`${day.label} at ${time}`} />
          <SummaryRow className="confirm-booking__summary-row" label="Price" value={`${service.price}, pay at pick-up`} />
        </section>
        <Input className="confirm-booking__input" name="name" autoComplete="name" required value={name} errorMessage={errors.name} onChange={event => updateField('name', event.currentTarget.value)} onBlur={() => validateField('name', name)} />
        <Input className="confirm-booking__input" name="phone" label="Phone number" placeholder="+32 470 12 34 56" state="Focus" type="tel" autoComplete="tel" required value={phone} errorMessage={errors.phone} onChange={event => updateField('phone', event.currentTarget.value)} onBlur={() => validateField('phone', phone)} />
        <p className="confirm-booking__note">We text you when your bike is ready. You pay when you pick it up.</p>
        {message && <p className="confirm-booking__status" role="status">{message}</p>}
      </form>
    </main>
    <ActionBar className="confirm-booking__action-bar" label="Confirm booking" type="submit" form="confirm-booking-form" />
  </div>
}
