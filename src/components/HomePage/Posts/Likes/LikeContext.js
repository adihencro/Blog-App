import React, { createContext, useState, useEffect } from 'react';

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likeId, setLikeId] = useState(null);

  const addLike = (id) => {
    setLikeId(id);
  };

  const removeLike = () => {
    setLikeId(null);
  };

  useEffect(() => {
    console.log("changed");
    console.log(likeId);
  }, [likeId]);

  return (
    <LikeContext.Provider value={{ likeId, addLike, removeLike }}>
      {children}
    </LikeContext.Provider>
  );
};