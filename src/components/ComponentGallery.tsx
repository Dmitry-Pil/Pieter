import { useState } from 'react'
import Button from './Button'
import Tag from './Tag'
import TimeSlot from './TimeSlot'
import Input from './Input'
import TopBar from './TopBar'
import ServiceCard from './ServiceCard'
import SummaryRow from './SummaryRow'
import ActionBar from './ActionBar'
import '../styles/ComponentGallery/ComponentGallery.css'

export default function ComponentGallery() {
  const [selectedSlot, setSelectedSlot] = useState(1)
  const [selectedCard, setSelectedCard] = useState(1)
  const [message, setMessage] = useState('')
  const book = () => setMessage('Booking action selected.')
  return <main className="component-gallery" aria-label="Spoke component library">
    <section className="component-gallery__buttons" aria-label="Button variants"><Button onClick={book} /><Button variant="Secondary" onClick={() => setMessage('Secondary action selected.')} /></section>
    <section className="component-gallery__tag" aria-label="Tag"><Tag /></section>
    <section className="component-gallery__times" aria-label="Time slot states">
      {[0, 1].map(index => <TimeSlot key={index} state={selectedSlot === index ? 'Selected' : 'Default'} onClick={() => setSelectedSlot(index)} />)}
      <TimeSlot state="Disabled" />
    </section>
    <section className="component-gallery__inputs" aria-label="Input states"><Input name="name-default" /><Input name="name-focus" state="Focus" /><Input name="name-error" state="Error" errorMessage="Enter your name." /></section>
    <section className="component-gallery__topbar" aria-label="Top bar"><TopBar onBack={() => setMessage('Back action selected.')} /></section>
    <section className="component-gallery__cards" aria-label="Service card states">{[0, 1].map(index => <ServiceCard key={index} state={selectedCard === index ? 'Selected' : 'Default'} onClick={() => setSelectedCard(index)} />)}</section>
    <section className="component-gallery__summary" aria-label="Summary row"><SummaryRow /></section>
    <section className="component-gallery__action" aria-label="Action bar"><ActionBar onClick={book} /></section>
    <p className="component-gallery__status" role="status">{message}</p>
  </main>
}
