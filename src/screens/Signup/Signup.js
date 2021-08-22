import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { BsFillCaretLeftFill } from "react-icons/bs";

import "./Signup.css";

export default function Signup() {
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleGoBack = () => {
    history.goBack();
  };

  const signup = () => {
    if (!name || !email || !password) {
      alert("Please type all the required fields");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Password do not match");
      return false;
    }

    Axios.post("http://192.168.1.100:5000/user/signup", {
      name,
      email,
      password,
    })
      .then((response) => {
        console.log(response.data);
        handleGoBack()
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="signupMain">
      <BsFillCaretLeftFill
        onClick={() => handleGoBack()}
        id="icon"
        color="white"
        size={30}
      />
      <h1>TeamPro</h1>
      <div>
        <p>Name</p>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <p>Email</p>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <p>Password</p>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <p>Confirm Password</p>
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={signup}>Continue</button>
    </div>
  );
}
