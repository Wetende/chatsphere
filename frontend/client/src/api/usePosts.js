import { useState, useEffect, useCallback } from 'react';
import {
    getPosts,
    getPost,
    getPostImage,
    togglePostLike,
    getPostStats,
    getPostsByCategory,
    getPostsByAuthor,
    getPopularPosts,
    getRecentPosts,
    getRelatedPosts,
    getCategories,
    getCategoryBySlug,
    getTags,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment,
    toggleCommentLike,
    reportComment,
    getImageUrl,
    searchContent,
    getTrendingPosts,
    getFeaturedPosts,
    bookmarkPost,
    getUserBookmarks,
    reportPost,
    createUserPost,
    updateUserPost,
    getUserDraftPosts,
    savePostAsDraft,
    publishDraftPost,
    deleteUserPost
} from './postsService';

// Hook to get all posts with optional filters
export const usePosts = (params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        if (params.skip) {
            setLoading(false);
            setPosts([]);
            setError(null);
            return;
        }

        try {
            setLoading(true);
            const data = await getPosts(params);
            setPosts(Array.isArray(data.posts) ? data.posts : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return { posts, loading, error, refetch: fetchPosts };
};

// Hook to get a single post
export const usePost = (postUuid) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postUuid) {
            setPost(null);
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            try {
                setLoading(true);
                const data = await getPost(postUuid);
                setPost(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.detail || err.message);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postUuid]);

    return { post, loading, error };
};

// Hook to get posts by category
export const usePostsByCategory = (categoryId, params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPostsByCategory = useCallback(async () => {
        if (!categoryId) {
            setPosts([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await getPostsByCategory(categoryId, params);
            setPosts(Array.isArray(data.posts) ? data.posts : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [categoryId, JSON.stringify(params)]);

    useEffect(() => {
        fetchPostsByCategory();
    }, [fetchPostsByCategory]);

    return { posts, loading, error, refetch: fetchPostsByCategory };
};

// Hook to get posts by author
export const usePostsByAuthor = (authorId, params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPostsByAuthor = useCallback(async () => {
        if (!authorId) {
            setPosts([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await getPostsByAuthor(authorId, params);
            setPosts(Array.isArray(data.posts) ? data.posts : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [authorId, JSON.stringify(params)]);

    useEffect(() => {
        fetchPostsByAuthor();
    }, [fetchPostsByAuthor]);

    return { posts, loading, error, refetch: fetchPostsByAuthor };
};

// Hook to get post statistics
export const usePostStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await getPostStats();
                setStats(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.detail || err.message);
                setStats(null);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};

// Hook to get popular posts
export const usePopularPosts = (params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPopularPosts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getPopularPosts(params);
            setPosts(Array.isArray(data.posts) ? data.posts : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchPopularPosts();
    }, [fetchPopularPosts]);

    return { posts, loading, error, refetch: fetchPopularPosts };
};

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getCategories();
            
            // Transform API response to header menu format
            const headerMenuData = transformCategoriesToMenuData(response.categories);
            setCategories(headerMenuData);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch categories');
            console.error('Categories fetch error:', err);
            // Fallback to empty array on error
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, error, refetch: fetchCategories };
};

/**
 * Hook to get a single category by slug
 */
export const useCategoryBySlug = (slug) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) {
            setCategory(null);
            setLoading(false);
            return;
        }

        const fetchCategory = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getCategoryBySlug(slug);
                setCategory(response);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch category');
                console.error('Category fetch error:', err);
                setCategory(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [slug]);

    return { category, loading, error };
};

/**
 * Transforms API categories response to header menu data format
 * @param {Array} apiCategories - Categories from API with subcategories
 * @returns {Array} - Formatted menu data for header
 */
const transformCategoriesToMenuData = (apiCategories) => {
    if (!Array.isArray(apiCategories)) return [];
    
    return apiCategories.map(category => ({
        title: category.name,
        link: `/category/${category.slug}`,
        dropdown: category.subcategories?.length > 0 
            ? category.subcategories.map(subcategory => ({
                title: subcategory.name,
                link: `/category/${subcategory.slug}`
            }))
            : null
    }));
};

export const useTags = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTags = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTags();
            setTags(data.tags || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setTags([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    return { tags, loading, error, refetch: fetchTags };
};

export const useRecentPosts = (params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecentPosts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getRecentPosts(params);
            setPosts(data.posts || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchRecentPosts();
    }, [fetchRecentPosts]);

    return { posts, loading, error, refetch: fetchRecentPosts };
};

export const useProfile = (userUuid) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userUuid) {
            setProfile(null);
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getProfile(userUuid);
                setProfile(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.detail || err.message);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userUuid]);

    return { profile, loading, error };
};

// Hook to get related posts based on current post
export const useRelatedPosts = (postUuid, options = { limit: 3 }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postUuid) {
            console.log('useRelatedPosts: No postUuid provided');
            setLoading(false);
            return;
        }

        const fetchRelatedPosts = async () => {
            try {
                console.log('useRelatedPosts: Fetching related posts for', postUuid);
                setLoading(true);
                setError(null);

                // Use the dedicated related posts endpoint
                const response = await getRelatedPosts(postUuid, { limit: options.limit });
                console.log('useRelatedPosts: Response from /related endpoint', response);
                
                setRelatedPosts(response.posts || []);
                console.log('useRelatedPosts: Set related posts', response.posts || []);
            } catch (err) {
                console.error('useRelatedPosts: Error fetching related posts', err);
                setError(err.response?.data?.detail || err.message || 'Failed to fetch related posts');
                setRelatedPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedPosts();
    }, [postUuid, options.limit]);

    return { relatedPosts, loading, error };
};

// ===== COMMENTS HOOKS =====

// Hook to get comments for a post
export const useComments = (postUuid, params = {}) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalComments, setTotalComments] = useState(0);

    const fetchComments = useCallback(async () => {
        if (!postUuid) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const response = await getComments({
                post_uuid: postUuid,
                ...params
            });
            
            setComments(response.comments || []);
            setTotalComments(response.total || 0);
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError(err.response?.data?.detail || err.message || 'Failed to fetch comments');
            setComments([]);
        } finally {
            setLoading(false);
        }
    }, [postUuid, params]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    // Function to refresh comments (useful after creating/updating/deleting)
    const refreshComments = useCallback(() => {
        fetchComments();
    }, [fetchComments]);

    return { comments, loading, error, totalComments, refreshComments };
};

// Hook to create a new comment
export const useCreateComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createNewComment = useCallback(async (commentData) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await createComment(commentData);
            return response;
        } catch (err) {
            console.error('Error creating comment:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to create comment';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { createNewComment, loading, error };
};

// Hook to update a comment
export const useUpdateComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateExistingComment = useCallback(async (commentUuid, commentData) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await updateComment(commentUuid, commentData);
            return response;
        } catch (err) {
            console.error('Error updating comment:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to update comment';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { updateExistingComment, loading, error };
};

// Hook to delete a comment
export const useDeleteComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteExistingComment = useCallback(async (commentUuid) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await deleteComment(commentUuid);
            return response;
        } catch (err) {
            console.error('Error deleting comment:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to delete comment';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { deleteExistingComment, loading, error };
};

// Hook to toggle comment like
export const useCommentLike = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleLike = useCallback(async (commentUuid) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await toggleCommentLike(commentUuid);
            return response;
        } catch (err) {
            console.error('Error toggling comment like:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to toggle like';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { toggleLike, loading, error };
};

// Hook to report a comment
export const useReportComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const reportCommentAction = useCallback(async (commentUuid, reportData) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await reportComment(commentUuid, reportData);
            return response;
        } catch (err) {
            console.error('Error reporting comment:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to report comment';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { reportCommentAction, loading, error };
};



// ===== SEARCH HOOKS =====

// Hook for global search with debouncing
export const useSearch = () => {
    const [searchResults, setSearchResults] = useState({ posts: [], users: [], categories: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = useCallback(async (query) => {
        if (!query || query.trim().length < 1) {
            setSearchResults({ posts: [], users: [], categories: [] });
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const response = await searchContent(query.trim());
            setSearchResults({
                posts: response.posts || [],
                users: response.users || [],
                categories: response.categories || []
            });
        } catch (err) {
            console.error('Error searching content:', err);
            setError(err.response?.data?.detail || err.message || 'Search failed');
            setSearchResults({ posts: [], users: [], categories: [] });
        } finally {
            setLoading(false);
        }
    }, []);

    const clearSearch = useCallback(() => {
        setSearchResults({ posts: [], users: [], categories: [] });
        setError(null);
        setLoading(false);
    }, []);

    return { searchResults, loading, error, search, clearSearch };
};

// ===== TRENDING & FEATURED POSTS HOOKS =====

// Hook to get trending posts
export const useTrendingPosts = (params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrendingPosts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTrendingPosts(params);
            setPosts(Array.isArray(data.posts) ? data.posts : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchTrendingPosts();
    }, [fetchTrendingPosts]);

    return { posts, loading, error, refetch: fetchTrendingPosts };
};

// Hook to get featured posts
export const useFeaturedPosts = (params = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeaturedPosts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getFeaturedPosts(params);
            setPosts(Array.isArray(data.posts) ? data.posts : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchFeaturedPosts();
    }, [fetchFeaturedPosts]);

    return { posts, loading, error, refetch: fetchFeaturedPosts };
};

// ===== BOOKMARK HOOKS =====

// Hook to handle bookmark functionality
export const useBookmark = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleBookmark = useCallback(async (postUuid) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await bookmarkPost(postUuid);
            return response;
        } catch (err) {
            console.error('Error toggling bookmark:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to bookmark post';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { toggleBookmark, loading, error };
};

// Hook to get user bookmarks
export const useUserBookmarks = (params = {}) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookmarks = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getUserBookmarks(params);
            setBookmarks(Array.isArray(data.posts) ? data.posts : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setBookmarks([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchBookmarks();
    }, [fetchBookmarks]);

    return { bookmarks, loading, error, refetch: fetchBookmarks };
};

// ===== REPORT HOOKS =====

// Hook to report posts
export const useReportPost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const reportPostAction = useCallback(async (postUuid, reportData) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await reportPost(postUuid, reportData);
            return response;
        } catch (err) {
            console.error('Error reporting post:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to report post';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { reportPostAction, loading, error };
};

// ===== USER POST CREATION HOOKS =====

// Hook to create a new post
export const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPost = useCallback(async (postData) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await createUserPost(postData);
            return response;
        } catch (err) {
            console.error('Error creating post:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to create post';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { createPost, loading, error };
};

// Hook to update a post
export const useUpdatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePost = useCallback(async (postUuid, postData) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await updateUserPost(postUuid, postData);
            return response;
        } catch (err) {
            console.error('Error updating post:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to update post';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { updatePost, loading, error };
};

// Hook to delete a post
export const useDeletePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deletePost = useCallback(async (postUuid) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await deleteUserPost(postUuid);
            return response;
        } catch (err) {
            console.error('Error deleting post:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to delete post';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { deletePost, loading, error };
};

// ===== DRAFT POSTS HOOKS =====

// Hook to get user's draft posts
export const useUserDraftPosts = (params = {}) => {
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDrafts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getUserDraftPosts(params);
            setDrafts(Array.isArray(data.posts) ? data.posts : []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
            setDrafts([]);
        } finally {
            setLoading(false);
        }
    }, [JSON.stringify(params)]);

    useEffect(() => {
        fetchDrafts();
    }, [fetchDrafts]);

    return { drafts, loading, error, refetch: fetchDrafts };
};

// Hook to save post as draft
export const useSaveAsDraft = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const saveAsDraft = useCallback(async (postData) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await savePostAsDraft(postData);
            return response;
        } catch (err) {
            console.error('Error saving as draft:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to save as draft';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { saveAsDraft, loading, error };
};

// Hook to publish a draft post
export const usePublishDraft = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const publishDraft = useCallback(async (postUuid) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await publishDraftPost(postUuid);
            return response;
        } catch (err) {
            console.error('Error publishing draft:', err);
            const errorMessage = err.response?.data?.detail || err.message || 'Failed to publish draft';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { publishDraft, loading, error };
};