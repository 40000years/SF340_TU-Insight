import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const { token } = useAuth()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) return null

  return token ? <DashboardPage /> : <LoginPage />
}

export default App
