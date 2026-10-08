import { useContext } from 'react'
import UserContext from './UserContext'

function useUser() {
  const context = useContext(UserContext)

  if (context === null) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export default useUser
