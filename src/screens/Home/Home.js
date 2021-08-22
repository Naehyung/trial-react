import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import Axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

export default function Home() {

  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('user')))

    if(!JSON.parse(localStorage.getItem('user'))) {
      history.push("/signin")
    } 

    getAllUsers();
  }, []);

  const getAllUsers = () => {
    Axios.get("http://192.168.1.106:5000/user/getAllUsers")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleSelectIndex = (user, index) => {
    const filteredSelectedIndex = selectedIndex.filter(
      (filteredIndex) => index !== filteredIndex
    );
    if (filteredSelectedIndex.length !== selectedIndex.length) {
      setSelectedIndex(filteredSelectedIndex);
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }

    const filteredSelectedUsers = selectedUsers.filter(
      (filteredUser) => user._id !== filteredUser
    );
    if (filteredSelectedUsers.length !== selectedUsers.length) {
      setSelectedUsers(filteredSelectedUsers);
    } else {
      setSelectedUsers([...selectedUsers, user._id]);
    }
  };

  const handleSelectAll = (users) => {
    const tempIndexArr = [];
    const tempUserArr = [];
    var count = 0;
    users.map((user) => {
      tempIndexArr.push(count);
      tempUserArr.push(user._id);
      console.log(count);
      count++;
    });
    setSelectedIndex(tempIndexArr);
    setSelectedUsers(tempUserArr);
  };

  const handleChecked = (index) => {
    return selectedIndex.some((value) => index === value);
  };

  const handleSendMessage = () => {
    Axios.post("http://192.168.1.100:5000/message/sendmessage", {
      ids: selectedUsers,
      content: message,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleSignout = () => {
    localStorage.removeItem('user')
    history.push("/signin")
  };

  return (
    <div className="homeMain">
      <div className="homeBodyLeft">
        <h1>TeamPro</h1>
        <button onClick={() => handleSignout()}>Sign Out</button>
      </div>
      <div className="homeBodyRight">
        <div className="homeBodyRightMain">
          <div>
            <div className="homeBodyRightMainUpper">
              <h1>The team</h1>
              <button onClick={() => handleSelectAll(users)}>Select all</button>
            </div>
            <div className="homeBodyRightMainCenter">
              {users?.map((user, index) => (
                <div className="homeBodyRightMainCenterUser">
                  <div className="homeBodyRightMainCenterUserName">
                    <AiOutlineUser size={20} id="icon" />
                    <p>{user.name}</p>
                  </div>
                  <div
                    className="homeBodyRightMainCenterUserSelect"
                    onClick={() => handleSelectIndex(user, index)}
                  >
                    {handleChecked(index) ? <TiTick /> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="homeBodyRightMainLower">
            <textarea onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => handleSendMessage()}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}
