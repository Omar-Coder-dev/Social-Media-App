import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Home() {
  let [postsList, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts() {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=50`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.message == "success") {
      setPosts(data.posts);
    }
    console.log(data);
  }


  return (
    <div className="w-3/4 mx-auto">
      {postsList.map((post) => {

        let{_id,body,image , user:{name , photo} , createdAt , comments } = post
        return <div key={_id} className="cardItem rounded-3xl my-5 p-5 bg-white">
          <div className="cardBody">
                    <div className="cardItem-Avatar">
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={photo}
              alt=""
            />
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(createdAt).toLocaleDateString()}          {new Date(createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        <p className="text-zinc-500 my-5">{body}</p>

        <img src={image} className="w-full rounded-2xl" alt={body} />
          </div>

          <div className="cardFooter">
            <div className="flex justify-between">
              <h2> {comments.length} Comments</h2>
              <Link to={'/postsDetails/'+_id} className="text-blue-600 underline">See Posts Details</Link>
            </div>
          </div>


          <div className="bg-gray-200 rounded-2xl py-5 my-5">
                                <div className="cardItem-Avatar">
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={comments[comments.length-1].commentCreator.photo}
              alt=""
            />
            <div className="font-medium dark:text-white">
              <div>{comments[comments.length-1].commentCreator.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(comments[comments.length-1].createdAt).toLocaleDateString()}   {new Date(comments[comments.length-1].createdAt).toLocaleTimeString()}
              </div>
              <h3>{comments[comments.length-1].content}</h3>
            </div>
          </div>
        </div>
          </div>
      </div>
        
      } )}

    </div>
  );
}
