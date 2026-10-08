import './App.css'
import router from './app.routes'
import { RouterProvider } from 'react-router'
import UserProvider from '../context/UserProvider'

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
