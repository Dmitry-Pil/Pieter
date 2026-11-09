import { useEffect } from 'react'
import ComponentGallery from './components/ComponentGallery'
import ChooseService from './pages/ChooseService/ChooseService'
import PickSlot from './pages/PickSlot/PickSlot'
import ConfirmBooking from './pages/ConfirmBooking/ConfirmBooking'

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  const titles: Record<string, string> = {
    '/choose-service': 'Choose a service',
    '/pick-slot': 'Pick a drop-off time',
    '/confirm': 'Check and confirm',
  }
  const title = titles[path] ?? 'Components'

  useEffect(() => {
    document.title = `${title} · Spoke`
  }, [title])

  if (path === '/choose-service') {
    return <ChooseService onContinue={service => {
      const url = new URL('/pick-slot', window.location.origin)
      const currentParams = new URLSearchParams(window.location.search)
      url.searchParams.set('service', service.id)
      for (const key of ['day', 'time']) {
        const value = currentParams.get(key)
        if (value) url.searchParams.set(key, value)
      }
      window.location.assign(url)
    }} />
  }
  if (path === '/pick-slot') {
    return <PickSlot onContinue={({ service, day, time }) => {
      const url = new URL('/confirm', window.location.origin)
      url.searchParams.set('service', service.id)
      url.searchParams.set('day', day)
      url.searchParams.set('time', time)
      window.location.assign(url)
    }} />
  }
  if (path === '/confirm') return <ConfirmBooking />
  return <ComponentGallery />
}
