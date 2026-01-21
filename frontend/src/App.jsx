import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { useAuth } from './context/AuthContext'
import './App.css'

function AppContent() {
  const { token } = useAuth()
  const [isReady, setIsReady] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  if (!isReady) return null

  return token ? (
    <DashboardPage theme={theme} onToggleTheme={toggleTheme} />
  ) : (
    <LoginPage theme={theme} onToggleTheme={toggleTheme} />
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
