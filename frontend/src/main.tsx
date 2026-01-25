import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import School from './pages/school.tsx'
import College from './pages/college.tsx'
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/school",
    element: <School />,
  },
  {
    path: "/college",
    element: <College />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
