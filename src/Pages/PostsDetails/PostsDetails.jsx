import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { LoadingContext } from "../../Context/LoadingContext";

export default function PostsDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    getPostDetails();
  }, []);

  async function getPostDetails() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setPost(data.post);
    } catch (err) {
      console.error("Failed to fetch post details:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {post && (
        <div className="cardItem rounded-3xl my-5 p-5 bg-white">
          <div className="cardBody">
            <div className="cardItem-Avatar">
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={post.user.photo}
                  alt="user"
                />
                <div className="font-medium dark:text-white">
                  <div>{post.user.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}{" "}
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-zinc-500 my-5">{post.body}</p>

            {post.image && (
              <img
                src={post.image}
                className="w-full rounded-2xl"
                alt={post.body}
              />
            )}
          </div>

          <div className="cardFooter">
            <div className="flex justify-between">
              <h2>{post.comments.length} Comments</h2>
            </div>
          </div>

          {post.comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-200 rounded-2xl py-5 my-5 px-4"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={comment.commentCreator.photo}
                  alt="comment user"
                />
                <div className="font-medium dark:text-white">
                  <div>{comment.commentCreator.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}{" "}
                    {new Date(comment.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <p className="ml-14 text-zinc-700">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
