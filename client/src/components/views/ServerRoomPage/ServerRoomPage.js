import './ServerRoomPage.css';
import React, {useState} from 'react'

function divClick() {
  alert("서버 IP 주소 내용");
}
function ServerRoomPage(props) {

  return (
    <div>
        <header>
        <ul class="header-ul">
            <li id="logo">
                <a href="https://ssu.ac.kr/">
                    <img src="image/soongsil.png" />
                </a>
            </li>
            <li><a>숭실대학교</a></li>
            <li><a>서버</a></li>
            <li><a>대여 시스템</a></li>
            <li id="vertical-line">|</li>
            <li><a>NDI</a></li>
        </ul>

        <ul class="header-ul">
            <li id="name">윤주호</li>
            <li>
                <img src="https://i.pinimg.com/564x/7a/c4/ed/7ac4edd64a67fccd0e2d547a9ffde845.jpg" id="profile-img"
                    alt="profile"></img>
            </li>
        </ul>
    </header>

      <ul id ="first_line">
        <div id = "server1" onClick={divClick} className='didiv'></div>
        <div id = "server2" onClick={divClick} className='didiv'></div>
        <div id = "server3" onClick={divClick} className='didiv'></div>
        <div id = "server4" onClick={divClick} className='didiv'></div>
        <div id = "server5" onClick={divClick} className='didiv'></div>
      </ul>
      <ul id="second_line">
      <div id = "server6" onClick={divClick} className='didiv'></div>
      <div id = "server7" onClick={divClick} className='didiv'></div>
      <div id = "server8" onClick={divClick} className='didiv'></div>
      <div id = "server9" onClick={divClick} className='didiv'></div>
      <div id = "server10" onClick={divClick} className='didiv'></div>
        </ul>
      <ul id="third_line">
      <div id = "server11" onClick={divClick} className='didiv'></div>
      <div id = "server12" onClick={divClick} className='didiv'></div>
      <div id = "server13" onClick={divClick} className='didiv'></div>
      <div id = "server14" onClick={divClick} className='didiv'></div>
      <div id = "server15" onClick={divClick} className='didiv'></div>
      </ul>
    </div>
  );
}

export default ServerRoomPage;