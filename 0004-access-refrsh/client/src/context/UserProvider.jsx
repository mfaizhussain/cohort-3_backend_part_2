import { useState } from 'react'
import UserContext from './UserContext'

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
