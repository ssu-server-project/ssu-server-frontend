import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response.data));
  }, []);

  function onLogoutClickHandler() {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          navigate('/login');
        } else {
          alert('로그아웃에 실패했습니다.');
        }
        console.log(response.data);
      });
  }

  function onSrvRoomClickHandler() {
    navigate('/serverRoom');
    console.log('서버 룸으로 이동!');
  }

  const Chart = () => {
    return (
      <PieChart
        data={[
          {
            value: 20,
            color: '#F6CB44',
            name: 'name1',
          },
        ]}
        reveal={20}
        lineWidth={18}
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        label={({ dataEntry }) => dataEntry.value + '%'}
        labelStyle={{
          fontSize: '26px',
          fill: '#333333',
        }}
        labelPosition={0}
      />
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          marginBottom: '350px',
          width: '100%',
        }}
      >
        <ul className="header-ul">
          <li id="logo">
            <a href="https://ssu.ac.kr/">
              <img style={{ width: '400px', marginLeft: '200px' }} src="image/soongsil.png" alt="Soongsil University" />
            </a>
          </li>
          <li><a>숭실대학교</a></li>
          <li><a>서버</a></li>
          <li><a>대여 시스템</a></li>
          <li id="vertical-line">|</li>
          <li><a>NDI</a></li>
        </ul>

        <ul className="header-ul">
          <li id="name">사용자 이름</li>
          <li>
            <img src="https://i.pinimg.com/564x/7a/c4/ed/7ac4edd64a67fccd0e2d547a9ffde845.jpg" id="profile-img" alt="profile" />
          </li>
        </ul>
      </header>
      <h2>시작 페이지</h2>
      <div
        style={{
          marginBottom: '425px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div>
          <Chart />
        </div>
        <div>
          <Chart />
        </div>
        <button onClick={onSrvRoomClickHandler}>서버 룸</button>
      </div>
    </div>
  );
}

export default LandingPage;
