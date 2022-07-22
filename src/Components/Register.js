import React from "react";
import { auth } from "../firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      swal({
        title: "Registered Successfully!",
        text: `Welcome ${auth.currentUser.email}, Go Login Now !`,
        icon: "success",
      });

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="mcont" align="center" style={{ paddingTop: 100 }}>
      <form>
        <div id="container">
          <header>
            <h2>Register to be an admin</h2>
          </header>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            placeholder="Enter your email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
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
              setRegisterPassword(event.target.value);
            }}
          />

          <input
            type="button"
            value="Register Now"
            className="sign"
            onClick={register}
          />
        </div>
      </form>
    </div>
  );
}

export default Register;
