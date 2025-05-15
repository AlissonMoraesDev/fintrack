import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { Toaster } from './components/ui/sonner'
import { AuthContextProvider } from './contexts/auth'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import NotFoundPage from './pages/not-found'
import SignupPage from './pages/signup'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  </>
)
