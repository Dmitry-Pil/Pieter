import { useState } from 'react'
import { services } from '../../data/services'
import type { Service } from '../../data/services'
import TopBar from '../../components/TopBar'
import ServiceCard from '../../components/ServiceCard'
import ActionBar from '../../components/ActionBar'
import '../../styles/ChooseService/ChooseService.css'

export type { Service } from '../../data/services'
export type ChooseServiceProps = {
  onContinue?: (service: Service) => void
  onBack?: () => void
}

export default function ChooseService({ onContinue, onBack }: ChooseServiceProps) {
  const [selectedId, setSelectedId] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('service')
    return services.find(service => service.id === requested)?.id ?? services[0].id
  })
  const [message, setMessage] = useState('')
  const selectedService = services.find(service => service.id === selectedId) ?? services[0]

  function continueBooking() {
    if (onContinue) {
      onContinue(selectedService)
      return
    }
    const url = new URL(window.location.href)
    url.searchParams.set('service', selectedService.id)
    window.history.replaceState(null, '', url)
    setMessage(`${selectedService.title} selected. Ready for the next booking step.`)
  }

  return <div className="choose-service" data-node-id="7:114">
    <TopBar className="choose-service__top-bar" onBack={onBack ?? (() => window.location.assign('/'))} />
    <main className="choose-service__content">
      <div className="choose-service__heading">
        <h2 className="choose-service__title">Choose a service</h2>
        <p className="choose-service__subtitle">What does your bike need?</p>
      </div>
      <div className="choose-service__list" role="group" aria-label="Choose one repair service">
        {services.map(service => <ServiceCard
          key={service.id}
          className="choose-service__card"
          title={service.title}
          description={service.description}
          price={service.price}
          tags={[service.duration]}
          state={selectedId === service.id ? 'Selected' : 'Default'}
          onClick={() => {
            setSelectedId(service.id)
            setMessage('')
          }}
        />)}
      </div>
      {message && <p className="choose-service__status" role="status">{message}</p>}
    </main>
    <ActionBar className="choose-service__action-bar" label="Continue" onClick={continueBooking} />
  </div>
}
