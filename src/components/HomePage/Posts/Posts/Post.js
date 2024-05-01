import React, { useState, useEffect, useContext } from 'react';
import { fetchPostDetails, fetchUserLikedPosts } from '../../../../api';
import './Post.css';
import { GoHeart } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdMore } from "react-icons/io";
import Comment from '../Comments/Comment';
import Like from '../Likes/Like';
import LikeAction from '../Likes/LikeAction';
import Modify from '../Modify/Modify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Auth/AuthContext';

const Post = ({ post }) => {
  const { userId } = useContext(AuthContext)
  const [details, setDetails] = useState([]);
  const [clickedLike, setClickedLike] = useState(false);
  const [action, setAction] = useState("");
  const [clickedNum, setClickedNum] = useState(false);
  const [clickedComment, setClickedComment] = useState(false);
  const [clickedModify, setClickedModify] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostDetails(post.id);
        setDetails(data);
      } catch (error) {
        console.error('Fetch posts error:', error);
      }

      try {
        const likedPostsData = await fetchUserLikedPosts(userId);
        likedPostsData.posts.forEach(likedPost => {
          if (likedPost[0].id === post.id) {
            setClickedLike(true); 
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    
    const fetchDataInterval = setInterval(fetchPost, 1000);
    return () => clearInterval(fetchDataInterval);
  }, [post.id, userId]);


  const handleClickLike = () => {
    if (!clickedLike) {
      setClickedLike(true);
      setAction("add");
    } else {
      setClickedLike(false);
      setAction("remove");
    }
  };

  const handleClickNum = () => {
    setClickedNum(true);
  };

  const handleClickComment = () => {
    setClickedComment(true);
  };

  const handleClickProfile = () => {
    navigate(`/profile/${details?.post?.creator}`);
  };

  const moreHandle = () => {
    setClickedModify(true);
  };


  return (
    <div className="wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className='creator' onClick={handleClickProfile}>@{details?.post?.creator_username}</p>
        {details?.post?.creator === userId && <IoMdMore className="more" onClick={moreHandle} />}
        {clickedModify && <Modify setClickedModify={setClickedModify} postID={post.id} />}
      </div>
      <div>
        {clickedNum && details?.likes && details.likes.length > 0 && <Like allLikes={details.likes} setClickedNum={setClickedNum} />}
        {clickedComment && <Comment allComments={details?.comments} setClickedComment={setClickedComment} postID={post.id} />}
      </div>
      {details?.post?.image && details.post.image.length > 0 ? (
        <>
          <img className='img' src={`http://127.0.0.1:8000/${details?.post?.image}`} alt={details?.post?.imageAlt || ''} />
          <p className='content'>{details?.post?.content}</p>
        </>
      ) : (
        <p className='content-only'>{details?.post?.content}</p>
      )}

      <div className='likes-comments-wrapper'>
        {/* Likes */}
        <div>
          <h3 className='likes-comments-h3'><GoHeart onClick={handleClickLike} style={{ fill: clickedLike ? 'red' : 'black' }} />
          <span onClick={handleClickNum} style={{ display: 'inline-block' }}>{details?.likes ? details.count_likes : 0}</span></h3>
          {(action === "add" || action === "remove") && <LikeAction action={action} setAction={setAction} postID={post.id} />}
        </div>

        {/* Comments */}
        <div>
          <h3 className='likes-comments-h3'><BiCommentDetail onClick={handleClickComment} /> {details?.comments ? details.count_comments : 0}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
