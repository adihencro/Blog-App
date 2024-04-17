import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [LikeId, setLikeId] = useState(null);

  const addLike = (id) => {
    setLikeId(id);
    console.log(id);
  };

  const removeLike = () => {
    setLikeId(null);
  };

  useEffect(() => {
    console.log(LikeId);
    console.log("changed");
  }, [LikeId]);

  return (
    <PostContext.Provider value={{ LikeId, addLike, removeLike }}>
      {children}
    </PostContext.Provider>
  );
};