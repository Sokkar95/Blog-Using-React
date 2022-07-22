import React from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { MutatingDots } from "react-loader-spinner";

const Home = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [spinnerClass, updateClass] = useState("invisible");

  const id = Date.now();
  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);

    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const changeClass = () => {
    updateClass("");
  };

  const addPost = async () => {
    changeClass();
    const url = await uploadFile();

    await addDoc(postsCollectionRef, {
      id,
      name,
      title,
      postText,
      url,
    });

    navigate("/post");
  };

  return (
    <div id="mcont" align="center" style={{ paddingTop: 60 }}>
      <div id="container">
        <header>
          <h2 style={{ fontFamily: "Pacifico" }}>W E L C O M E</h2>
        </header>
        <label htmlFor="Author">Author</label>
        <input
          type="text"
          className="Author"
          id="Author"
          placeholder="Add Your Name "
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label htmlFor="title">TITLE</label>
        <input
          type="text"
          className="title"
          id="title"
          placeholder="Add Your Title "
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="post" style={{ marginTop: 5 }}>
          POST
        </label>
        <textarea
          className="Post"
          id="Post"
          placeholder="Type Your Post Here..."
          style={{ height: 170 }}
          onChange={(event) => {
            setPostText(event.target.value);
          }}
        />

        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />

        <input
          type="button"
          value="Add Post "
          onClick={addPost}
          className="addPost"
        />
        <div className={spinnerClass}>
          <MutatingDots color="#00BFFF" height={80} width={80} />{" "}
          <h3>Hold On ..</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
