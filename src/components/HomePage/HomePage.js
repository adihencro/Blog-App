import React from "react";
import "./HomePage.css";
import PostList from "./Posts/Posts/PostList";
import NavBar from "./Nav/NavBar";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="content">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
