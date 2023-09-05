import './ServerRoomPage.css';
import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ServerRoomPage(props) {
  const navigate = useNavigate();
  function onLogoutClickHandler() {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          navigate("/login");
        } else {
          alert("Fail to logout.");
        }
        console.log(response.data);
      });
  }
  function onLandingHandler() {
          navigate("/");
      };
  function onServerHandler () {
    window.location.href = 'http://localhost:3002';
  };
  return (
    <div>
        <header>
        <ul class="header-ul">
            <li id="logo">
                <a href="https://ssu.ac.kr/">
                    <img style={{width:"400px",marginLeft:"200px" }} src="image/soongsil.png" />
                </a>
            </li>
            <li><a>숭실대학교</a></li>
            <li><a>서버</a></li>
            <li><a>대여 시스템</a></li>
            <li id="vertical-line">|</li>
            <li><a>NDI</a></li>
        </ul>

        <ul class="header-ul">
          <button onClick={onLogoutClickHandler}>로그아웃</button>
          <button onClick={onLandingHandler}>사용량 보기</button>
            <li id="name">로그인 이름 넣어주세요</li>
            <li>
                <img src="https://i.pinimg.com/564x/7a/c4/ed/7ac4edd64a67fccd0e2d547a9ffde845.jpg" id="profile-img"
                    alt="profile"></img>
            </li>
        </ul>
    </header>

      <ul id ="first_line">
        <div id = "server1" onClick={onServerHandler} className='didiv'></div>
        <div id = "server2" onClick={onServerHandler} className='didiv'></div>
        <div id = "server3" onClick={onServerHandler} className='didiv'></div>
        <div id = "server4" onClick={onServerHandler} className='didiv'></div>
        <div id = "server5" onClick={onServerHandler} className='didiv'></div>
      </ul>
      <ul id="second_line">
      <div id = "server6" onClick={onServerHandler} className='didiv'></div>
      <div id = "server7" onClick={onServerHandler} className='didiv'></div>
      <div id = "server8" onClick={onServerHandler} className='didiv'></div>
      <div id = "server9" onClick={onServerHandler} className='didiv'></div>
      <div id = "server10" onClick={onServerHandler} className='didiv'></div>
        </ul>
      <ul id="third_line">
      <div id = "server11" onClick={onServerHandler} className='didiv'></div>
      <div id = "server12" onClick={onServerHandler} className='didiv'></div>
      <div id = "server13" onClick={onServerHandler} className='didiv'></div>
      <div id = "server14" onClick={onServerHandler} className='didiv'></div>
      <div id = "server15" onClick={onServerHandler} className='didiv'></div>
      </ul>
    </div>
  );
}

export default ServerRoomPage;