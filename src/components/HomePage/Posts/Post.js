import React, { useState, useEffect, useContext } from 'react';
import { BLOG_API_URL } from '../../../api';
import './Post.css';
import { GoHeart } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";
import Comment from './Comment';
import { AuthContext } from "../../Auth/AuthContext";

const Post = ({ post }) => {
  const [details, setDetails] = useState([]);
  const [clickedLike, setClickedLike] = useState(false);
  const [clickedComment, setClickedComment] = useState(false);
  const { token, userId } = useContext(AuthContext);

  console.log(token, userId);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BLOG_API_URL}/posts/advanced_view/${post.id}}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        console.log('Fetched post details:', data);
        setDetails(data);
      } catch (error) {
        console.error('Fetch posts error:', error);
      }
    };
    fetchPosts();
  }, []);


  const handleClickLike = () => {
    setClickedLike(!clickedLike);
    if (!clickedLike) {
      details?.likes && details.likes.length > 0 ? setClickedLike(details?.likes) : (setClickedLike([]));
    }
  };

  const handleClickComment = () => {
    setClickedComment(true);
    console.log(clickedComment);
  };


  return (
    <div className="wrapper">
      <p className='creator'>@{details?.post?.creator_username}</p>
      {clickedComment && details?.comments && details.comments.length > 0 && <Comment allComments={details.comments} setClickedComment={setClickedComment} postID={post.id} />}
      {details?.post?.image && details.post.image.length > 0 ? (
        <>
          <img className='img' src={`http://127.0.0.1:8000/${details?.post?.image}`} />
          <p className='content'>{details?.post?.content}</p>
        </>
      ) : (
        <p className='content-only'>{details?.post?.content}</p>
      )}

      {/* Likes and Comments */}
      <div className='likes-comments-wrapper'>
        {/* Likes */}
        <div>
          <h3 className='likes-comments-h3'><GoHeart onClick={handleClickLike}/> {details?.likes ? details.count_likes : 0}</h3>
          <ul className='ul'>
            {clickedLike && clickedLike.length > 0 ? (
              clickedLike.map(like => (
                <li className='li' key={like.id}>
                  {like.liked_by_username}
                </li>
              ))
            ) : (
              <p></p>
            )}
          </ul>
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
