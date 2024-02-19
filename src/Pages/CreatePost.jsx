import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      timestamp: serverTimestamp(),
    });
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      {" "}
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <div className="inputGp">
            <label>Post: </label>
            <textarea
              placeholder="Post..."
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            />
          </div>
          <button onClick={createPost}>Submit Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
