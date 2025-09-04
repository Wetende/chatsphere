import { useState, useEffect, useCallback } from 'react'
import { 
    getUserMedia, 
    uploadMedia, 
    getMediaByUuid, 
    updateMedia, 
    deleteMedia,
    validateFile
} from './mediaService'
import useAuth from './useAuth'

// Hook for fetching user media
export const useUserMedia = (page = 1, limit = 20) => {
    const [media, setMedia] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        const fetchMedia = async () => {
            if (!isAuthenticated) {
                setLoading(false)
                return
            }

            try {
                const response = await getUserMedia(page, limit)
                
                if (page === 1) {
                    setMedia(response.media || response || [])
                } else {
                    setMedia(prev => [...prev, ...(response.media || response || [])])
                }
                
                setHasMore(response.has_more || false)
                setTotal(response.total || (response.media || response || []).length)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to fetch media')
            } finally {
                setLoading(false)
            }
        }

        fetchMedia()
    }, [isAuthenticated, page, limit])

    const refetch = useCallback(async () => {
        if (!isAuthenticated) return

        setLoading(true)
        try {
            const response = await getUserMedia(1, limit * page)
            setMedia(response.media || response || [])
            setHasMore(response.has_more || false)
            setTotal(response.total || (response.media || response || []).length)
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to refresh media')
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated, page, limit])

    return { media, loading, error, hasMore, total, refetch }
}

// Hook for uploading media
export const useUploadMedia = () => {
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState(null)
    const { isAuthenticated } = useAuth()

    const upload = useCallback(async (file, description = null) => {
        if (!isAuthenticated) {
            setError('You must be logged in to upload media')
            return null
        }

        const validation = validateFile(file)
        if (!validation.isValid) {
            setError(validation.errors.join(', '))
            return null
        }

        setUploading(true)
        setUploadProgress(0)
        setError(null)
        
        try {
            const response = await uploadMedia(
                file, 
                description, 
                (progress) => setUploadProgress(progress)
            )
            setUploadProgress(100)
            return response
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to upload media')
            return null
        } finally {
            setUploading(false)
            setTimeout(() => setUploadProgress(0), 1000)
        }
    }, [isAuthenticated])

    const uploadMultiple = useCallback(async (files, descriptions = []) => {
        if (!isAuthenticated) {
            setError('You must be logged in to upload media')
            return []
        }

        const results = []
        setUploading(true)
        setError(null)

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const description = descriptions[i] || null
                
                const validation = validateFile(file)
                if (!validation.isValid) {
                    results.push({ 
                        file: file.name, 
                        success: false, 
                        error: validation.errors.join(', ')
                    })
                    continue
                }

                try {
                    const response = await uploadMedia(
                        file, 
                        description,
                        (progress) => {
                            const overallProgress = ((i + (progress / 100)) / files.length) * 100
                            setUploadProgress(Math.round(overallProgress))
                        }
                    )
                    results.push({ 
                        file: file.name, 
                        success: true, 
                        data: response 
                    })
                } catch (err) {
                    results.push({ 
                        file: file.name, 
                        success: false, 
                        error: err.response?.data?.detail || 'Upload failed'
                    })
                }
            }

            setUploadProgress(100)
            return results
        } catch (err) {
            setError(err.message || 'Failed to upload media files')
            return results
        } finally {
            setUploading(false)
            setTimeout(() => setUploadProgress(0), 1000)
        }
    }, [isAuthenticated])

    return { 
        upload, 
        uploadMultiple, 
        uploading, 
        uploadProgress, 
        error,
        setError: useCallback((err) => setError(err), [])
    }
}

// Hook for getting specific media
export const useMedia = (mediaUuid) => {
    const [media, setMedia] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        const fetchMedia = async () => {
            if (!isAuthenticated || !mediaUuid) {
                setLoading(false)
                return
            }

            try {
                const response = await getMediaByUuid(mediaUuid)
                setMedia(response)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to fetch media')
            } finally {
                setLoading(false)
            }
        }

        fetchMedia()
    }, [isAuthenticated, mediaUuid])

    return { media, loading, error }
}

// Hook for updating media
export const useUpdateMedia = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { isAuthenticated } = useAuth()

    const update = useCallback(async (mediaUuid, description) => {
        if (!isAuthenticated) {
            setError('You must be logged in to update media')
            return null
        }

        setLoading(true)
        setError(null)
        
        try {
            const response = await updateMedia(mediaUuid, description)
            return response
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to update media')
            return null
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated])

    return { update, loading, error }
}

// Hook for deleting media
export const useDeleteMedia = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { isAuthenticated } = useAuth()

    const deleteFile = useCallback(async (mediaUuid) => {
        if (!isAuthenticated) {
            setError('You must be logged in to delete media')
            return false
        }

        setLoading(true)
        setError(null)
        
        try {
            await deleteMedia(mediaUuid)
            return true
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to delete media')
            return false
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated])

    return { deleteFile, loading, error }
}

// Hook for media management (combines multiple operations)
export const useMediaManagement = () => {
    const { media, loading: fetchLoading, error: fetchError, refetch } = useUserMedia()
    const { upload, uploading, uploadProgress, error: uploadError } = useUploadMedia()
    const { update, loading: updateLoading, error: updateError } = useUpdateMedia()
    const { deleteFile, loading: deleteLoading, error: deleteError } = useDeleteMedia()

    const [selectedMedia, setSelectedMedia] = useState([])

    const selectMedia = useCallback((mediaUuid) => {
        setSelectedMedia(prev => 
            prev.includes(mediaUuid) 
                ? prev.filter(id => id !== mediaUuid)
                : [...prev, mediaUuid]
        )
    }, [])

    const selectAll = useCallback(() => {
        setSelectedMedia(media.map(item => item.uuid))
    }, [media])

    const clearSelection = useCallback(() => {
        setSelectedMedia([])
    }, [])

    const deleteSelected = useCallback(async () => {
        const results = []
        
        for (const mediaUuid of selectedMedia) {
            const success = await deleteFile(mediaUuid)
            results.push({ mediaUuid, success })
        }

        if (results.some(r => r.success)) {
            refetch()
            clearSelection()
        }

        return results
    }, [selectedMedia, deleteFile, refetch, clearSelection])

    const uploadAndRefresh = useCallback(async (file, description) => {
        const result = await upload(file, description)
        if (result) {
            refetch()
        }
        return result
    }, [upload, refetch])

    const updateAndRefresh = useCallback(async (mediaUuid, description) => {
        const result = await update(mediaUuid, description)
        if (result) {
            refetch()
        }
        return result
    }, [update, refetch])

    const error = fetchError || uploadError || updateError || deleteError

    return {
        media,
        selectedMedia,
        loading: fetchLoading,
        uploading,
        uploadProgress,
        updating: updateLoading,
        deleting: deleteLoading,
        error,
        
        upload: uploadAndRefresh,
        update: updateAndRefresh,
        deleteFile,
        deleteSelected,
        refetch,
        selectMedia,
        selectAll,
        clearSelection
    }
}

export default {
    useUserMedia,
    useUploadMedia,
    useMedia,
    useUpdateMedia,
    useDeleteMedia,
    useMediaManagement
}