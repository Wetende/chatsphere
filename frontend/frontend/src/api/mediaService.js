import { axiosPrivate } from './axios'

// Get user's media files
export const getUserMedia = async (page = 1, limit = 20) => {
    try {
        const response = await axiosPrivate.get('/media/', {
            params: { page, limit }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching user media:', error)
        throw error
    }
}

// Upload media file
export const uploadMedia = async (file, description = null, onProgress = null) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        if (description) {
            formData.append('description', description)
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: onProgress ? (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                )
                onProgress(percentCompleted)
            } : undefined
        }

        const response = await axiosPrivate.post('/media/upload', formData, config)
        return response.data
    } catch (error) {
        console.error('Error uploading media:', error)
        throw error
    }
}

// Get specific media by UUID
export const getMediaByUuid = async (mediaUuid) => {
    try {
        const response = await axiosPrivate.get(`/media/${mediaUuid}`)
        return response.data
    } catch (error) {
        console.error('Error fetching media:', error)
        throw error
    }
}

// Update media description
export const updateMedia = async (mediaUuid, description) => {
    try {
        const response = await axiosPrivate.put(`/media/${mediaUuid}`, {
            description
        })
        return response.data
    } catch (error) {
        console.error('Error updating media:', error)
        throw error
    }
}

// Delete media file
export const deleteMedia = async (mediaUuid) => {
    try {
        const response = await axiosPrivate.delete(`/media/${mediaUuid}`)
        return response.data
    } catch (error) {
        console.error('Error deleting media:', error)
        throw error
    }
}

// Helper functions
export const getImageUrl = (filePath) => {
    if (!filePath) return null
    
    if (filePath.startsWith('http')) {
        return filePath
    }
    
    const baseUrl = process.env.REACT_APP_API_BASE_URL || '/v1'
    return `${baseUrl.replace('/v1', '')}/media/files/${filePath}`
}

export const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const isImageFile = (mimeType) => {
    return mimeType && mimeType.startsWith('image/')
}

export const isVideoFile = (mimeType) => {
    return mimeType && mimeType.startsWith('video/')
}

export const isPdfFile = (mimeType) => {
    return mimeType === 'application/pdf'
}

export const getFileIcon = (mimeType) => {
    if (isImageFile(mimeType)) return 'fas fa-image'
    if (isVideoFile(mimeType)) return 'fas fa-video'
    if (isPdfFile(mimeType)) return 'fas fa-file-pdf'
    if (mimeType && mimeType.includes('audio')) return 'fas fa-music'
    if (mimeType && mimeType.includes('text')) return 'fas fa-file-alt'
    return 'fas fa-file'
}

// Validate file before upload
export const validateFile = (file, maxSizeBytes = 10 * 1024 * 1024) => { // 10MB default
    const errors = []
    
    if (file.size > maxSizeBytes) {
        errors.push(`File size must be less than ${formatFileSize(maxSizeBytes)}`)
    }
    
    const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/webm', 'video/ogg',
        'application/pdf',
        'audio/mpeg', 'audio/wav'
    ]
    
    if (!allowedTypes.includes(file.type)) {
        errors.push('File type not supported')
    }
    
    return {
        isValid: errors.length === 0,
        errors
    }
}

export default {
    getUserMedia,
    uploadMedia,
    getMediaByUuid,
    updateMedia,
    deleteMedia,
    getImageUrl,
    formatFileSize,
    isImageFile,
    isVideoFile,
    isPdfFile,
    getFileIcon,
    validateFile
}