import { useState, useEffect } from 'react'
import { axiosPrivate } from './axios'

/**
 * Custom hook for managing user profile data
 * @param {string} userUuid - The user's UUID
 * @returns {Object} Profile data, loading state, error, and refetch function
 */
export const useProfile = (userUuid) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfile = async () => {
    if (!userUuid) {
      setError('User UUID is required')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await axiosPrivate.get(`/profiles/${userUuid}`)
      setProfile(response.data)
    } catch (err) {
      console.error('Error fetching profile:', err)
      
      if (err.response?.status === 404) {
        setError('Profile not found')
      } else if (err.response?.status === 403) {
        setError('Access denied - you can only view your own profile')
      } else {
        setError(err.response?.data?.message || 'Failed to load profile')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [userUuid])

  const refetch = () => {
    fetchProfile()
  }

  return {
    profile,
    loading,
    error,
    refetch
  }
}

export default useProfile