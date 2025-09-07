import { useState, useEffect, useCallback } from 'react'
import { 
    followUser, 
    unfollowUser, 
    getUserFollowers, 
    getUserFollowing, 
    checkIfFollowing,
    getUserProfile,
    getUserByUsername,
    updateUserProfile,
    getUserStats,
    searchUsers
} from './userService'
import useAuth from './useAuth'

// Hook for following/unfollowing users
export const useFollowUser = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { isAuthenticated } = useAuth()

    const follow = useCallback(async (userUuid) => {
        if (!isAuthenticated) {
            setError('You must be logged in to follow users')
            return false
        }

        setLoading(true)
        setError(null)
        
        try {
            await followUser(userUuid)
            return true
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to follow user')
            return false
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated])

    const unfollow = useCallback(async (userUuid) => {
        if (!isAuthenticated) {
            setError('You must be logged in to unfollow users')
            return false
        }

        setLoading(true)
        setError(null)
        
        try {
            await unfollowUser(userUuid)
            return true
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to unfollow user')
            return false
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated])

    return { follow, unfollow, loading, error }
}

// Hook for checking if following a user
export const useIsFollowing = (userUuid) => {
    const [isFollowing, setIsFollowing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        const checkFollowing = async () => {
            if (!isAuthenticated || !userUuid) {
                setLoading(false)
                return
            }

            try {
                const response = await checkIfFollowing(userUuid)
                setIsFollowing(response.is_following)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to check following status')
            } finally {
                setLoading(false)
            }
        }

        checkFollowing()
    }, [userUuid, isAuthenticated])

    const refetch = useCallback(async () => {
        if (!isAuthenticated || !userUuid) return

        setLoading(true)
        try {
            const response = await checkIfFollowing(userUuid)
            setIsFollowing(response.is_following)
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to check following status')
        } finally {
            setLoading(false)
        }
    }, [userUuid, isAuthenticated])

    return { isFollowing, loading, error, refetch }
}

// Hook for fetching user followers
export const useUserFollowers = (userUuid, page = 1, limit = 20) => {
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchFollowers = async () => {
            if (!userUuid) {
                setLoading(false)
                return
            }

            try {
                const response = await getUserFollowers(userUuid, page, limit)
                
                if (page === 1) {
                    setFollowers(response.users || [])
                } else {
                    setFollowers(prev => [...prev, ...(response.users || [])])
                }
                
                setHasMore(response.has_more || false)
                setTotal(response.total || 0)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to fetch followers')
            } finally {
                setLoading(false)
            }
        }

        fetchFollowers()
    }, [userUuid, page, limit])

    return { followers, loading, error, hasMore, total }
}

// Hook for fetching user following
export const useUserFollowing = (userUuid, page = 1, limit = 20) => {
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchFollowing = async () => {
            if (!userUuid) {
                setLoading(false)
                return
            }

            try {
                const response = await getUserFollowing(userUuid, page, limit)
                
                if (page === 1) {
                    setFollowing(response.users || [])
                } else {
                    setFollowing(prev => [...prev, ...(response.users || [])])
                }
                
                setHasMore(response.has_more || false)
                setTotal(response.total || 0)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to fetch following')
            } finally {
                setLoading(false)
            }
        }

        fetchFollowing()
    }, [userUuid, page, limit])

    return { following, loading, error, hasMore, total }
}

// Hook for fetching user profile
export const useUserProfile = (userUuid) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            if (!userUuid) {
                setLoading(false)
                return
            }

            try {
                const response = await getUserProfile(userUuid)
                setUser(response)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to fetch user profile')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [userUuid])

    return { user, loading, error }
}

// Hook for fetching user by username
export const useUserByUsername = (username) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            if (!username) {
                setLoading(false)
                return
            }

            try {
                const response = await getUserByUsername(username)
                setUser(response)
            } catch (err) {
                setError(err.response?.data?.detail || 'User not found')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [username])

    return { user, loading, error }
}

// Hook for updating user profile
export const useUpdateUserProfile = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { updateUser } = useAuth()

    const updateProfile = useCallback(async (userData) => {
        setLoading(true)
        setError(null)
        
        try {
            const response = await updateUserProfile(userData)
            updateUser(response) // Update auth context
            return response
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to update profile')
            return null
        } finally {
            setLoading(false)
        }
    }, [updateUser])

    return { updateProfile, loading, error }
}

// Hook for fetching user stats
export const useUserStats = (userUuid) => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStats = async () => {
            if (!userUuid) {
                setLoading(false)
                return
            }

            try {
                const response = await getUserStats(userUuid)
                setStats(response)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to fetch user stats')
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [userUuid])

    return { stats, loading, error }
}

// Hook for searching users
export const useSearchUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)

    const searchUsersQuery = useCallback(async (query, page = 1, limit = 20) => {
        if (!query.trim()) {
            setUsers([])
            return
        }

        setLoading(true)
        setError(null)
        
        try {
            const response = await searchUsers(query, page, limit)
            
            if (page === 1) {
                setUsers(response.users || [])
            } else {
                setUsers(prev => [...prev, ...(response.users || [])])
            }
            
            setHasMore(response.has_more || false)
            setTotal(response.total || 0)
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to search users')
        } finally {
            setLoading(false)
        }
    }, [])

    return { users, searchUsersQuery, loading, error, hasMore, total }
}

export default {
    useFollowUser,
    useIsFollowing,
    useUserFollowers,
    useUserFollowing,
    useUserProfile,
    useUserByUsername,
    useUpdateUserProfile,
    useUserStats,
    useSearchUsers
}