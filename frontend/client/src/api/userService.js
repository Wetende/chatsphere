import { axiosPrivate, axiosInstance } from './axios'

// User Following Functions
export const followUser = async (userUuid) => {
    try {
        const response = await axiosPrivate.post(`/users/${userUuid}/follow`)
        return response.data
    } catch (error) {
        console.error('Error following user:', error)
        throw error
    }
}

export const unfollowUser = async (userUuid) => {
    try {
        const response = await axiosPrivate.delete(`/users/${userUuid}/follow`)
        return response.data
    } catch (error) {
        console.error('Error unfollowing user:', error)
        throw error
    }
}

export const getUserFollowers = async (userUuid, page = 1, limit = 20) => {
    try {
        const response = await axiosInstance.get(`/users/${userUuid}/followers`, {
            params: { page, limit }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching user followers:', error)
        throw error
    }
}

export const getUserFollowing = async (userUuid, page = 1, limit = 20) => {
    try {
        const response = await axiosInstance.get(`/users/${userUuid}/following`, {
            params: { page, limit }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching user following:', error)
        throw error
    }
}

export const checkIfFollowing = async (userUuid) => {
    try {
        const response = await axiosPrivate.get(`/users/${userUuid}/is-following`)
        return response.data
    } catch (error) {
        console.error('Error checking if following user:', error)
        throw error
    }
}

// User Profile Functions
export const getUserProfile = async (userUuid) => {
    try {
        const response = await axiosInstance.get(`/users/${userUuid}`)
        return response.data
    } catch (error) {
        console.error('Error fetching user profile:', error)
        throw error
    }
}

export const getUserByUsername = async (username) => {
    try {
        const response = await axiosInstance.get(`/users/username/${username}`)
        return response.data
    } catch (error) {
        console.error('Error fetching user by username:', error)
        throw error
    }
}

export const updateUserProfile = async (userData) => {
    try {
        const response = await axiosPrivate.put('/users/me', userData)
        return response.data
    } catch (error) {
        console.error('Error updating user profile:', error)
        throw error
    }
}

export const getUserStats = async (userUuid) => {
    try {
        const response = await axiosInstance.get(`/users/${userUuid}/stats`)
        return response.data
    } catch (error) {
        console.error('Error fetching user stats:', error)
        throw error
    }
}

// Search Users
export const searchUsers = async (query, page = 1, limit = 20) => {
    try {
        const response = await axiosInstance.get('/users/search', {
            params: { q: query, page, limit }
        })
        return response.data
    } catch (error) {
        console.error('Error searching users:', error)
        throw error
    }
}

export default {
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
}