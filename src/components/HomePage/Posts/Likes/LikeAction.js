import React, { useEffect, useContext } from "react";
import { BLOG_API_URL } from "../../../../api";
import { AuthContext } from "../../../Auth/AuthContext";
import { LikeContext } from "./LikeContext"; 

  
  const LikeAction = ({ action, setAction, postID }) => {
    const { token, userId } = useContext(AuthContext);
    const { likeId, addLike, removeLike } = useContext(LikeContext);
    console.log(likeId);
    const formData = {
      liked_by: userId,
      post_id: postID,
    };

    const handleLikeAdd = async () => {
      try {
          const response = await fetch(`${BLOG_API_URL}/likes/post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          addLike(data.payload.id);
      } catch (error) {
        console.log(error.message);
      }
    }; 

    const handleLikeRemove = async () => {
      try {
          const response = await fetch(`${BLOG_API_URL}/likes/${likeId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });
      } catch (error) {
        console.log(error.message);
      }
    }; 
  
    useEffect(() => {
      if (action === "add") {
        handleLikeAdd();
        addLike();
      } else {
        handleLikeRemove();
        removeLike();
      }
      setAction("");
    }, [action]);
  
    return null;
  };
  
  export default LikeAction;
  