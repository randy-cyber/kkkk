/* eslint-disable react-refresh/only-export-components -- app entry, not HMR-relevant */
import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { AppLayout } from '@/components/layout/AppLayout'
import { Logo } from '@/components/Logo'

const Landing = lazy(() => import('@/pages/Landing'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Flights = lazy(() => import('@/pages/Flights'))
const Hotels = lazy(() => import('@/pages/Hotels'))
const Assistant = lazy(() => import('@/pages/Assistant'))
const Watchlist = lazy(() => import('@/pages/Watchlist'))
const Alerts = lazy(() => import('@/pages/Alerts'))
const Destinations = lazy(() => import('@/pages/Destinations'))

function PageLoader() {
  return (
    <div className="grid min-h-dvh place-items-center bg-ink-950">
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  )
}

const withSuspense = (node: React.ReactNode) => <Suspense fallback={<PageLoader />}>{node}</Suspense>

const router = createBrowserRouter([
  { path: '/', element: withSuspense(<Landing />) },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(<Dashboard />) },
      { path: 'flights', element: withSuspense(<Flights />) },
      { path: 'hotels', element: withSuspense(<Hotels />) },
      { path: 'assistant', element: withSuspense(<Assistant />) },
      { path: 'watchlist', element: withSuspense(<Watchlist />) },
      { path: 'alerts', element: withSuspense(<Alerts />) },
      { path: 'destinations', element: withSuspense(<Destinations />) },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
