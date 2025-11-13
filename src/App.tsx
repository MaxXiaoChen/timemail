import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useEffect } from 'react'
import { useUserStore } from './store/useUserStore'

export default function App() {
  const loadStoredEmail = useUserStore((state) => state.loadStoredEmail)

  useEffect(() => {
    loadStoredEmail()
  }, [loadStoredEmail])

  return (
    <div className="min-h-screen">
      <Outlet />
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={4000}
      />
    </div>
  )
}
