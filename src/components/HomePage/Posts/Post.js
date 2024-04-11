import React, { useState, useEffect, useContext } from 'react';
import { BLOG_API_URL } from '../../../api';
import './Post.css';
import { GoHeart } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";
import { AuthContext } from '../../../AuthContext';

const Post = ({ post }) => {
  const [details, setDetails] = useState([]);
  const [clickedLike, setClickedLike] = useState(false);
  const [clickedComment, setClickedComment] = useState(false);
  const { token } = useContext(AuthContext);

  console.log(token);

  useEffect(() => {
    fetch(`${BLOG_API_URL}/posts/advanced_view/${post.id}}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched post details:', data);
        setDetails(data);
      })
      .catch(error => console.error('Error fetching post details:', error));
  }, []);

  const handleClickLike = () => {
    setClickedLike(!clickedLike);
    if (!clickedLike) {
      details?.likes && details.likes.length > 0 ? setClickedLike(details?.likes) : (setClickedLike([]));
    }
  };

  const handleClickComment = () => {
    setClickedComment(!clickedComment);
    if (!clickedComment) {
      details?.comments && details.comments.length > 0 ? setClickedComment(details?.comments) : (setClickedLike([]));
    }
  };


  return (
    <div className="wrapper" postid>
      <p className='creator'>@{details?.post?.creator_username}</p>
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
          <ul className='ul'>
            {clickedComment && clickedComment.length > 0 ? (
              clickedComment.map(comment => (
                <li className='li' key={comment.id}>
                  <p className='p-name'>{comment.commented_by_username}</p>
                  <p className='p'>{comment.content}</p>
                </li>
              ))
            ) : (
              <p></p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Post;
