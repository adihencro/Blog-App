import React, { useEffect, useState, useContext } from "react";
import "./Modify.css";
import { AuthContext } from "../../../Auth/AuthContext";
import { BLOG_API_URL, fetchPostDetails } from "../../../../api";

const Modify = ({ setClickedModify, postID }) => {
  const { token } = useContext(AuthContext);

  const deleteHandle = async (event) => {
    event.preventDefault();

    try {
      const data = await fetchPostDetails(postID);
      data.likes.map((detail) =>
        fetch(`${BLOG_API_URL}/likes/${detail.id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }),
      );

      data.comments.map((detail) =>
        fetch(`${BLOG_API_URL}/comments/${detail.id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }),
      );
    } catch (error) {
      console.error("Fetch posts error:", error);
    }

    try {
      const response = await fetch(`${BLOG_API_URL}/posts/${postID}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      !response.ok &&
        console.log(`API request failed with status ${response.status}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updatehandle = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="modalBackground-modify">
      <div className="modalContainer-modify">
        <div
          className="close-button"
          onClick={() => {
            setClickedModify(false);
          }}
        >
          <span className="close-icon">X</span>
        </div>
        <button className="button" onClick={deleteHandle}>
          delete
        </button>
        <button className="button" onClick={updatehandle}>
          update
        </button>
      </div>
    </div>
  );
};

export default Modify;
