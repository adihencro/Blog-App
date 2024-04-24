import React, { useState, useEffect, useContext } from 'react';
import { BLOG_API_URL } from '../../../../api';
import './Post.css';
import { GoHeart } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";
import Comment from '../Comments/Comment';
import Like from '../Likes/Like';
import LikeAction from '../Likes/LikeAction';
import { AuthContext } from "../../../Auth/AuthContext";

const Post = ({ post }) => {
  const [details, setDetails] = useState([]);
  const [clickedLike, setClickedLike] = useState(false);
  const [action, setAction] = useState("");
  const [clickedNum, setClickedNum] = useState(false);
  const [clickedComment, setClickedComment] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BLOG_API_URL}/posts/advanced_view/${post.id}}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Fetch posts error:', error);
      }

    };
    fetchPosts();

    const fetchDataInterval = setInterval(fetchPosts, 5000); // Fetch data every 5 seconds
    return () => clearInterval(fetchDataInterval);
  }, []);


  const handleClickLike = () => {
    if (!clickedLike) {
      setAction("add");
      setClickedLike(true); 
    } else {
      setAction("remove");
    }
  };

  const handleClickNum = () => {
    setClickedNum(true);
  };

  const handleClickComment = () => {
    setClickedComment(true);
  };


  return (
    <div className="wrapper">
      <p className='creator'>@{details?.post?.creator_username}</p>
      {clickedNum &&  details?.likes && details.likes.length > 0 && <Like allLikes={details.likes} setClickedNum={setClickedNum} />}
      {clickedComment && <Comment allComments={details?.comments} setClickedComment={setClickedComment} postID={post.id} />}
      {details?.post?.image && details.post.image.length > 0 ? (
        <>
          <img className='img' src={`http://127.0.0.1:8000/${details?.post?.image}`} />
          <p className='content'>{details?.post?.content}</p>
        </>
      ) : (
        <p className='content-only'>{details?.post?.content}</p>
      )}

      <div className='likes-comments-wrapper'>
        {/* Likes */}
        <div>
          <h3 className='likes-comments-h3'><GoHeart onClick={handleClickLike} style={{ fill: clickedLike ? 'red' : 'black'}} /><span onClick={handleClickNum} style={{ display: 'inline-block' }}>{details?.likes ? details.count_likes : 0}</span></h3>
          {(action === "add" || action === "remove") && <LikeAction action={action} setAction={setAction} postID={post.id} />}
        </div>

        {/* Comments */}
        <div>
          <h3 className='likes-comments-h3'><BiCommentDetail onClick={handleClickComment}/> {details?.comments ? details.count_comments : 0}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
