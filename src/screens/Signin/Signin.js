import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { BsFillCaretLeftFill } from "react-icons/bs";

import "./Signin.css";

export default function Signin(props) {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signin = () => {
    Axios.post("http://192.168.1.100:5000/user/signin", {
      email,
      password,
    })
      .then((response) => {
        console.log(response.data.result);
        localStorage.setItem("user",JSON.stringify(response.data.result))
        history.push("/home")
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleGoBack = () => {
    history.goBack()
  }

  return (
    <div className="signinMain">
      <BsFillCaretLeftFill onClick={()=>handleGoBack()} id="icon" color="white" size={30}/>
      <h1>TeamPro</h1>
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

      <button onClick={signin}>Continue</button>
    </div>
  );
}
