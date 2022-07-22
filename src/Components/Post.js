import React from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

const Post = () => {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [postsCollectionRef]);

  return (
    <div className="container mt-5 mb-5" style={{ paddingTop: 50 }}>
      {postLists.length === 0 ? (
        <h1
          style={{ display: "flex", justifyContent: "center", color: "white" }}
        >
          No Posts Yet.
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

                  <img
                    className="img-fluid img-responsive rounded product-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6 mt-1">
                  <h4 className="Title">{post.title}</h4>

                  <h5 style={{ paddingTop: 20 }}>{post.postText}</h5>
                </div>
                <h5 style={{ paddingLeft: 850, paddingTop: 30 }}>
                  Author Name: <br />{" "}
                  <span style={{ color: "#3c5b63" }}>{post.name}</span>
                </h5>
              </div>
              <br />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
