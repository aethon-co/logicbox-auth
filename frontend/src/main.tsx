import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import School from './pages/school.tsx'
import College from './pages/college.tsx'
import Login from './pages/login.tsx'
import Home from './pages/home.tsx'
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/school/:referralCode?",
    element: <School />,
  },
  {
    path: "/",
    element: <College />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
