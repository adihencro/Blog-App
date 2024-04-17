import React, { useEffect, useState, useContext } from "react";
import "./Like.css";

const Like = ({ allLikes, setClickedNum }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div
          className="close-button"
          onClick={() => {
            setClickedNum(false);
          }}
        >
          <span className="close-icon">X</span>
        </div>
        <p className="title">Likes</p>
        <ul className="ul">
          {allLikes.map((like) => (
            <li className="li" key={like.id}>
              <p className="p-name">@{like.liked_by_username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Like;
