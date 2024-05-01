export const BLOG_API_URL = "http://127.0.0.1:8000";

export const fetchUserLikedPosts = async (userId) => {
    try {
      const response = await fetch(`${BLOG_API_URL}/users/get_liked_post/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch posts error:", error);
      throw error;
    }
  };

  export const fetchPostDetails = async (postId) => {
    try {
      const response = await fetch(`${BLOG_API_URL}/posts/advanced_view/${postId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch post details error:", error);
      throw error;
    }
  };