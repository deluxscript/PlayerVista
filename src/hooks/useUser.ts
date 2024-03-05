import { useState } from 'react'
import * as api from '../api'
import { useNavigate } from 'react-router-dom'
import { routes } from '../constants/routes'

export type UserHook = ReturnType<typeof useUser>

export function useUser() {
  const [data, setData] = useState<api.AuthenticatedUserData>()
  const navigate = useNavigate()

  function refreshUserData(): Promise<api.AuthenticatedUserData | undefined> {
    return api.getAuthenticatedUser()
      .then(user => {
        setData(user)
        return user
      })
      .catch(e => {
        if (e instanceof api.UnauthorizedError) {
          navigate(routes.login)
        } else {
          console.error('Unhandled error getting user data', e)
        }
        return undefined
      })
  }

  async function initializeApp (): Promise<api.AuthenticatedUserData | undefined> {
    console.debug('Initially loading user data')
    const user = await refreshUserData()
    if (user) {
      console.log('User is logged in' )
    }
    console.debug('Initial user data loaded')
    return user
  }

  return {
    data,
    refreshUserData,
    /**
     * Effect to run at application startup
     */
    initializeApp,
  }
}
