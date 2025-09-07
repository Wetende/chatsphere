import { axiosInstance, axiosPrivate } from './axios';

// ===== IMAGE UTILITIES =====
export const getImageUrl = (imagePath, folder) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    
    const filename = imagePath.split('/').pop();
    return `/v1/uploads/images/${filename}?folder=${folder || 'posts'}`;
};

// ===== POSTS SERVICES =====
export const getPosts = async (params = {}) => {
    try {
        const clientParams = { ...params, published: true };
        const response = await axiosInstance.get('/posts/', { params: clientParams });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPost = async (postUuid) => {
    try {
        const response = await axiosPrivate.get(`/posts/${postUuid}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPostImage = async (filename) => {
    try {
        const response = await axiosInstance.get(`/uploads/images/${filename}?folder=posts`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const togglePostLike = async (postUuid) => {
    try {
        const response = await axiosPrivate.post(`/posts/${postUuid}/like`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPostStats = async () => {
    try {
        const response = await axiosInstance.get('/posts/stats/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPostsByCategory = async (categoryId, params = {}) => {
    try {
        const clientParams = { ...params, category_id: categoryId, published: true };
        const response = await axiosInstance.get('/posts/', { params: clientParams });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPostsByAuthor = async (authorId, params = {}) => {
    try {
        const clientParams = { ...params, author_id: authorId, published: true };
        const response = await axiosInstance.get('/posts/', { params: clientParams });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPopularPosts = async (params = {}) => {
    try {
        const response = await axiosInstance.get('/posts/popular', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRecentPosts = async (params = {}) => {
    try {
        const response = await axiosInstance.get('/posts/recent', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching recent posts:', error);
        throw error;
    }
};

// Get related posts for a specific post
export const getRelatedPosts = async (postUuid, params = {}) => {
    try {
        const response = await axiosInstance.get(`/posts/${postUuid}/related`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching related posts:', error);
        throw error;
    }
};

// ===== COMMENTS SERVICES =====

// Get comments for a post or all comments with filters
export const getComments = async (params = {}) => {
    try {
        const response = await axiosInstance.get('/comments/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// Get a single comment by UUID
export const getComment = async (commentUuid) => {
    try {
        const response = await axiosInstance.get(`/comments/${commentUuid}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
};

// Create a new comment
export const createComment = async (commentData) => {
    try {
        const response = await axiosPrivate.post('/comments/', commentData);
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

// Update a comment
export const updateComment = async (commentUuid, commentData) => {
    try {
        const response = await axiosPrivate.put(`/comments/${commentUuid}`, commentData);
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};

// Delete a comment
export const deleteComment = async (commentUuid) => {
    try {
        const response = await axiosPrivate.delete(`/comments/${commentUuid}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

// Toggle like on a comment
export const toggleCommentLike = async (commentUuid) => {
    try {
        const response = await axiosPrivate.post(`/comments/${commentUuid}/like`);
        return response.data;
    } catch (error) {
        console.error('Error toggling comment like:', error);
        throw error;
    }
};

// Report a comment
export const reportComment = async (commentUuid, reportData) => {
    try {
        const response = await axiosPrivate.post(`/comments/${commentUuid}/report`, reportData);
        return response.data;
    } catch (error) {
        console.error('Error reporting comment:', error);
        throw error;
    }
};




// ===== CATEGORIES SERVICES =====
export const getCategories = async () => {
    try {
        const response = await axiosInstance.get('/posts/categories/');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getCategoryBySlug = async (slug) => {
    try {
        const { data } = await axiosInstance.get('/posts/categories/');
        const categories = data.categories || [];
        // Search parents first
        const parent = categories.find((c) => c.slug === slug);
        if (parent) {
            return { ...parent, parent: null, isSubcategory: false };
        }
        // Then search subcategories and attach parent meta for breadcrumbs
        for (const c of categories) {
            const match = (c.subcategories || []).find((s) => s.slug === slug);
            if (match) {
                return {
                    ...match,
                    parent: { id: c.id, name: c.name, slug: c.slug },
                    isSubcategory: true,
                };
            }
        }
        const err = new Error('Category not found');
        err.status = 404;
        throw err;
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        throw error;
    }
};

export const getSubcategories = async (categoryId) => {
    try {
               
        return [];
    } catch (error) {
        throw error;
    }
};

// ===== TAGS SERVICES =====
export const getTags = async () => {
    try {
        const response = await axiosInstance.get('/posts/tags/');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
};

// ===== PROFILES SERVICES =====
export const getProfile = async (userUuid) => {
    try {
        const response = await axiosInstance.get(`/profiles/${userUuid}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProfile = async (profileData) => {
    try {
        const formData = new FormData();
        
        if (profileData.bio) formData.append('bio', profileData.bio);
        if (profileData.location) formData.append('location', profileData.location);
        if (profileData.website) formData.append('website', profileData.website);
        if (profileData.twitter_handle) formData.append('twitter_handle', profileData.twitter_handle);
        if (profileData.github_handle) formData.append('github_handle', profileData.github_handle);
        if (profileData.linkedin_handle) formData.append('linkedin_handle', profileData.linkedin_handle);
        if (profileData.birth_date) formData.append('birth_date', profileData.birth_date);
        
        // Add avatar file if provided
        if (profileData.avatar) {
            formData.append('avatar', profileData.avatar);
        }

        const response = await axiosPrivate.post('/profiles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (userUuid, profileData) => {
    try {
        const formData = new FormData();
        
        if (profileData.bio !== undefined) formData.append('bio', profileData.bio || '');
        if (profileData.location !== undefined) formData.append('location', profileData.location || '');
        if (profileData.website !== undefined) formData.append('website', profileData.website || '');
        if (profileData.twitter_handle !== undefined) formData.append('twitter_handle', profileData.twitter_handle || '');
        if (profileData.github_handle !== undefined) formData.append('github_handle', profileData.github_handle || '');
        if (profileData.linkedin_handle !== undefined) formData.append('linkedin_handle', profileData.linkedin_handle || '');
        if (profileData.birth_date !== undefined) formData.append('birth_date', profileData.birth_date || '');
        
        if (profileData.avatar) {
            formData.append('avatar', profileData.avatar);
        }

        const response = await axiosPrivate.put(`/profiles/${userUuid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProfile = async (userUuid) => {
    try {
        const response = await axiosPrivate.delete(`/profiles/${userUuid}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ===== SEARCH SERVICES =====
export const searchContent = async (query) => {
    try {
        const response = await axiosInstance.get('/search', { 
            params: { q: query } 
        });
        return response.data;
    } catch (error) {
        console.error('Error searching content:', error);
        throw error;
    }
};

// ===== TRENDING & FEATURED POSTS SERVICES =====
export const getTrendingPosts = async (params = {}) => {
    try {
        const response = await axiosInstance.get('/posts/trending/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending posts:', error);
        throw error;
    }
};

export const getFeaturedPosts = async (params = {}) => {
    try {
        const response = await axiosInstance.get('/posts/featured', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching featured posts:', error);
        throw error;
    }
};

// ===== BOOKMARK SERVICES =====
export const bookmarkPost = async (postUuid) => {
    try {
        const response = await axiosPrivate.post(`/posts/${postUuid}/bookmark`);
        return response.data;
    } catch (error) {
        console.error('Error bookmarking post:', error);
        throw error;
    }
};

export const getUserBookmarks = async (params = {}) => {
    try {
        const response = await axiosPrivate.get('/posts/users/me/bookmarks', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching user bookmarks:', error);
        throw error;
    }
};

// ===== REPORT SERVICES =====
export const reportPost = async (postUuid, reportData) => {
    try {
        const response = await axiosPrivate.post(`/posts/${postUuid}/report`, reportData);
        return response.data;
    } catch (error) {
        console.error('Error reporting post:', error);
        throw error;
    }
};

// ===== USER POST CREATION SERVICES =====
export const createUserPost = async (postData) => {
    try {
        // Create FormData for multipart/form-data submission (supports file uploads)
        const formData = new FormData();
        
        // Add all post fields
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        
        if (postData.excerpt) formData.append('excerpt', postData.excerpt);
        if (postData.meta_title) formData.append('meta_title', postData.meta_title);
        if (postData.meta_description) formData.append('meta_description', postData.meta_description);
        if (postData.slug) formData.append('slug', postData.slug);
        if (postData.category_id) formData.append('category_id', postData.category_id);
        if (postData.reading_time) formData.append('reading_time', postData.reading_time);
        
        // Handle tag_ids as comma-separated string
        if (postData.tag_ids && postData.tag_ids.length > 0) {
            formData.append('tag_ids', postData.tag_ids.join(','));
        }
        
        // Handle featured image file
        if (postData.featured_image && postData.featured_image instanceof File) {
            formData.append('featured_image', postData.featured_image);
        }
        
        // Default to draft unless explicitly set to publish
        const isPublished = postData.is_published || false;
        formData.append('is_published', isPublished);

        const response = await axiosPrivate.post('/posts/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user post:', error);
        throw error;
    }
};

export const updateUserPost = async (postUuid, postData) => {
    try {
        // Create FormData for multipart/form-data submission (supports file uploads)
        const formData = new FormData();
        
        // Add all post fields that are being updated
        if (postData.title !== undefined) formData.append('title', postData.title);
        if (postData.content !== undefined) formData.append('content', postData.content);
        if (postData.excerpt !== undefined) formData.append('excerpt', postData.excerpt || '');
        if (postData.meta_title !== undefined) formData.append('meta_title', postData.meta_title || '');
        if (postData.meta_description !== undefined) formData.append('meta_description', postData.meta_description || '');
        if (postData.slug !== undefined) formData.append('slug', postData.slug);
        if (postData.category_id !== undefined) formData.append('category_id', postData.category_id || '');
        if (postData.reading_time !== undefined) formData.append('reading_time', postData.reading_time || '');
        
        // Handle tag_ids as comma-separated string
        if (postData.tag_ids !== undefined) {
            const tagIdsString = Array.isArray(postData.tag_ids) ? postData.tag_ids.join(',') : '';
            formData.append('tag_ids', tagIdsString);
        }
        
        // Handle featured image file (new upload)
        if (postData.featured_image && postData.featured_image instanceof File) {
            formData.append('featured_image', postData.featured_image);
        }

        const response = await axiosPrivate.put(`/posts/${postUuid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user post:', error);
        throw error;
    }
};

// ===== DRAFT POSTS SERVICES =====
export const getUserDraftPosts = async (params = {}) => {
    try {
        const response = await axiosPrivate.get('/posts/drafts', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching user draft posts:', error);
        throw error;
    }
};

export const savePostAsDraft = async (postData) => {
    try {
        // Ensure it's saved as draft
        const draftData = { ...postData, is_published: false };
        return await createUserPost(draftData);
    } catch (error) {
        console.error('Error saving post as draft:', error);
        throw error;
    }
};

export const publishDraftPost = async (postUuid) => {
    try {
        const response = await axiosPrivate.put(`/posts/${postUuid}`, { is_published: true });
        return response.data;
    } catch (error) {
        console.error('Error publishing draft post:', error);
        throw error;
    }
};

export const deleteUserPost = async (postUuid) => {
    try {
        const response = await axiosPrivate.delete(`/posts/${postUuid}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user post:', error);
        throw error;
    }
}; 