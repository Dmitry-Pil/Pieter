import { useState } from 'react'
import TopBar from '../../components/TopBar'
import TimeSlot from '../../components/TimeSlot'
import ActionBar from '../../components/ActionBar'
import { services } from '../../data/services'
import { days, times } from '../../data/slots'
import type { Service } from '../../data/services'
import '../../styles/PickSlot/PickSlot.css'


export type SlotSelection = { service: Service; day: string; time: string }
export type PickSlotProps = {
  onContinue?: (selection: SlotSelection) => void
  onBack?: (selection: SlotSelection) => void
}

export default function PickSlot({ onContinue, onBack }: PickSlotProps) {
  const params = new URLSearchParams(window.location.search)
  const service = services.find(item => item.id === params.get('service')) ?? services[0]
  const [day, setDay] = useState<string>(() => days.find(item => item.id === params.get('day'))?.id ?? 'today')
  const [time, setTime] = useState<string>(() => times.find(item => item.label === params.get('time') && !item.disabled)?.label ?? '16:30')
  const [message, setMessage] = useState('')
  const duration = service.duration.replace(' min', ' minutes')
  const selection = { service, day, time }

  function selectionUrl(path: string) {
    const url = new URL(path, window.location.origin)
    url.searchParams.set('service', service.id)
    url.searchParams.set('day', day)
    url.searchParams.set('time', time)
    return url
  }

  function goBack() {
    if (onBack) {
      onBack(selection)
      return
    }
    window.location.assign(selectionUrl('/choose-service'))
  }

  function continueBooking() {
    if (onContinue) {
      onContinue(selection)
      return
    }
    window.history.replaceState(null, '', selectionUrl('/pick-slot'))
    const dayLabel = days.find(item => item.id === day)?.label ?? 'Today'
    setMessage(`Drop-off selected: ${dayLabel} at ${time}. Ready for the next booking step.`)
  }

  return <div className="pick-slot" data-node-id="7:121">
    <TopBar className="pick-slot__top-bar" step="Step 2 of 3" onBack={goBack} />
    <main className="pick-slot__content">
      <div className="pick-slot__heading">
        <h2 className="pick-slot__title">Pick a drop-off time</h2>
        <p className="pick-slot__subtitle">{service.title}, about {duration}</p>
      </div>
      <section className="pick-slot__group" aria-labelledby="pick-slot-day-label">
        <h3 className="pick-slot__label" id="pick-slot-day-label">Day</h3>
        <div className="pick-slot__options" role="group" aria-label="Day">
          {days.map(item => <TimeSlot key={item.id} label={item.label} state={day === item.id ? 'Selected' : 'Default'} onClick={() => { setDay(item.id); setMessage('') }} />)}
        </div>
      </section>
      <section className="pick-slot__group" aria-labelledby="pick-slot-time-label">
        <h3 className="pick-slot__label" id="pick-slot-time-label">Drop-off time</h3>
        <div className="pick-slot__options" role="group" aria-label="Drop-off time">
          {times.map(item => <TimeSlot key={item.label} label={item.label} state={item.disabled ? 'Disabled' : time === item.label ? 'Selected' : 'Default'} onClick={() => { setTime(item.label); setMessage('') }} />)}
        </div>
      </section>
      <p className="pick-slot__note">Ready the same day. We text you when your bike is done.</p>
      {message && <p className="pick-slot__status" role="status">{message}</p>}
    </main>
    <ActionBar className="pick-slot__action-bar" label="Continue" onClick={continueBooking} />
  </div>
}
