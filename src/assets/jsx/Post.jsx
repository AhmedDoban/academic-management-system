import { useState } from "react";
import { Users } from "../../dummyData";

function Post(props) {
  const [like, setLike] = useState(props.Post.like);
  const [isliked, setIsLiked] = useState(false);

  let likeHandelar = (e) => {
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };

  return (
    <div className="width-full bg-fff p-20 box-Shadow mb-25 mt-20">
      <div className="post-top between-flex">
        <div className="left center-flex gap-20">
          <img
            src={
              Users.filter((p) => p.id === props.Post.userId)[0].profilePicture
            }
            alt="user avatar"
            className="img-Small "
          />
          <div className="info col-flex display-flex">
            <span>
              {Users.filter((p) => p.id === props.Post.userId)[0].username}
            </span>
            <span> {props.Post.date}</span>
          </div>
        </div>
        <i className="fa-solid fa-ellipsis-vertical "></i>
      </div>
      <div className="post-center mt-20  mb-20 width-full">
        {props.Post?.desc}
        <img src={props.Post.photo} alt="" className="width-full mt-20" />
      </div>
      <div className="post bottom between-flex">
        <div className="reacts display-flex gap-20 align-center ">
          <i
            className={
              isliked ? "active fa-solid fa-heart" : "fa-solid fa-heart"
            }
            onClick={likeHandelar}
          ></i>
          <span>{like} people like this</span>
        </div>
        <div className="comments">
          <p> 9 comments</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
