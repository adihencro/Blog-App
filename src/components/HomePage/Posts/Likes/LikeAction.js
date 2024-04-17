import React, { useEffect, useState, useContext } from "react";
import { BLOG_API_URL } from "../../../../api";
import { AuthContext } from "../../../Auth/AuthContext";
import { PostContext } from "../Posts/PostContext";


const handleLikeAction = async ({ action, setAction, postID, token, userId, likeId, addLike, removeLike }) => {
    try {
      if (action === "add") {
        const formData = {
          liked_by: userId,
          post_id: postID,
        };
        const response = await fetch(`${BLOG_API_URL}/likes/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        addLike(data.id);
        console.log(likeId);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } else {
        const response = await fetch(`${BLOG_API_URL}/likes/${likeId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
      }
      setAction("");
      removeLike();
      console.log(likeId);
    } catch (error) {
      console.log(error.message);
    }
  }; 
  
  const LikeAction = ({ action, setAction, postID }) => {
    const { token, userId } = useContext(AuthContext);
    const { likeId, addLike, removeLike } = useContext(PostContext);
  
    useEffect(() => {
      if (action) {
        handleLikeAction({ action, setAction, postID, token, userId, likeId, addLike, removeLike });
      }
    }, [action, setAction, postID, token, userId ]);
  
    return null;
  };
  
  export default LikeAction;
  