import React , {useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const navigate = useNavigate();
  // Axios를 통해서 get 방식으로 /api/hello에 request를 보냄.
  // 보낼 시 해당 data를 콘솔에 찍어주도록 함. 
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  },[])

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
  function onSrvRoomClickHandler() {

          navigate("/serverRoom");
          console.log("serverRoom으로 이동!");
  }
  
  return (
    <div style= {{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh',flexDirection:"column",
    }}>
      <header
        style={{
          marginBottom:"350px",
          width:"100%",
        }}>
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
            <li id="name">사용자 이름</li>
            <li>
                <img src="https://i.pinimg.com/564x/7a/c4/ed/7ac4edd64a67fccd0e2d547a9ffde845.jpg" id="profile-img"
                    alt="profile"></img>
            </li>
        </ul>
    </header>
      <h2> 시작 페이지</h2>
      <div
        style={{
          marginBottom:"425px"
        }}>
        <button onClick={onSrvRoomClickHandler}>
          서버 룸
        </button>
      </div>
    </div>
  )
}

export default LandingPage;
