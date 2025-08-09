import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (user?._id) {
      getUserPosts();
    }
  }, [user]);

  async function getUserPosts() {
    try {
      const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/user/${user._id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUserPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to fetch user posts", err);
    }
  }

  if (!user) {
    return <div className="text-center mt-10 text-gray-500">No user data found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6">
        <img
          className="w-28 h-28 rounded-full border-4 border-blue-600"
          src={user.photo}
          alt={user.name}
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-400">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">My Posts</h3>
      <div className="mt-4 grid gap-4">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
              {post.image && <img src={post.image} alt="" className="mt-2 rounded-lg" />}
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">You haven’t posted anything yet.</p>
        )}
      </div>
    </div>
  );
}
