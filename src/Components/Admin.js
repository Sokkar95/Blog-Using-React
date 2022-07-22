import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

function Admin({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [click, setClick] = useState(false);
  const [editEnable, seteditEnable] = useState(false);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [author, setAuthor] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
    if (isAuth === false) {
      navigate("/login");
    }
  }, [click]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setClick(!click);
  };

  const updatePost = async (id) => {
    await updateDoc(doc(db, "posts", id), {
      title: title,
      postText: des,
      name: author,
    });
    setClick(!click);
    seteditEnable(false);
  };

  return (
    <div className="container mt-5 mb-5" style={{ paddingTop: 50 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/home">
          <button className="btn btn-primary  m-3" type="button">
            {" "}
            <i className="bi bi-plus-circle"></i> <span>Add New Post</span>
          </button>
        </Link>
      </div>
      {postLists.length === 0 ? (
        <h1
          style={{ display: "flex", justifyContent: "center", color: "white" }}
        >
          Oops , There's no more Posts exist.
        </h1>
      ) : (
        ""
      )}

      {postLists.map((post) => {
        return (
          <div className="d-flex justify-content-center row" key={post.id}>
            <div className="col-md-10">
              <div className="row p-2 bg-white border rounded">
                <div className="col-md-3 mt-1">
                  <img
                    className="img-fluid img-responsive rounded product-image"
                    src={post.url}
                    alt=""
                  />
                </div>

                <div className="col-md-6 mt-1">
                  {!editEnable && <h4 className="Title">{post.title}</h4>}
                  {editEnable && (
                    <textarea
                      autoFocus
                      onChange={(e) => setTitle(e.currentTarget.value)}
                    >
                      {post.title}
                    </textarea>
                  )}

                  {!editEnable && <h5>{post.postText}</h5>}
                  {editEnable && (
                    <textarea
                      autoFocus
                      onChange={(e) => setDes(e.currentTarget.value)}
                    >
                      {post.postText}
                    </textarea>
                  )}
                </div>

                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                  <div className="d-flex flex-row align-items-center"></div>
                  <h6 className="text-success ">Admin Tools</h6>
                  <div className="d-flex flex-column mt-4">
                    {!editEnable && (
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => seteditEnable(true)}
                      >
                        Edit Post
                      </button>
                    )}
                    {editEnable && (
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => {
                          updatePost(post.id);
                          setClick(!click);
                        }}
                      >
                        Save Post
                      </button>
                    )}

                    <button
                      className="btn btn-outline-danger btn-sm mt-2"
                      type="button"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
                <h5 style={{ paddingLeft: 850, paddingTop: 30 }}>
                  Author Name: <br />
                  {!editEnable && (
                    <span style={{ color: "#3c5b63" }}>{post.name}</span>
                  )}
                  {editEnable && (
                    <textarea
                      autoFocus
                      onChange={(e) => setAuthor(e.currentTarget.value)}
                    >
                      {post.name}
                    </textarea>
                  )}
                </h5>
              </div>
              <br />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Admin;
