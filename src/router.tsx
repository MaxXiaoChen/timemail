import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import LandingPage from './pages/LandingPage'
import ComposePage from './pages/ComposePage'
import ConfirmPage from './pages/ConfirmPage'
import HistoryPage from './pages/HistoryPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'compose',
        element: <ComposePage />
      },
      {
        path: 'confirm',
        element: <ConfirmPage />
      },
      {
        path: 'history',
        element: <HistoryPage />
      }
    ]
  }
])