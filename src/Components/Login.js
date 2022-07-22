import React from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Login({ setAuth }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      swal({
        title: `Successfully Logged In!`,
        icon: "success",
      });
      setAuth(true);
      navigate("/admin");
    } catch (error) {
      swal({
        title: `Wrong Password`,
        icon: "error",
      });
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/admin");
  //   }
  // }, []);

  return (
    <div id="mcont" align="center" style={{ paddingTop: 100 }}>
      <div id="container">
        <header>
          <h2>Sign in as an admin</h2>
        </header>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="email"
          id="email"
          placeholder="Enter your email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button type="button" value="Sign in " className="sign" onClick={login}>
          {" "}
          Sign In{" "}
        </button>
      </div>
    </div>
  );
}

export default Login;
