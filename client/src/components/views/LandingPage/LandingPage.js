import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';

function LandingPage() {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [memData, setMemData] = useState(null);
  const [containerCount, setContainerCount] = useState(0);
  const [containerUsage, setContainerUsage] = useState(0);

  useEffect(() => {
    axios.get('/docker/api/v1/state/')
      .then(response => {
        const memData = parseFloat(response.data.mem);
        setMemData(memData);

        setChartData([
          {
            value: memData,
            color: '#F6CB44',
            name: 'name1',
          },
          {
            value: 100 - memData,
            color: '#E5E5E5',
            name: 'Free Memory',
          }
        ]);

        setContainerCount(17); // 컨테이너 갯수
        setContainerUsage(20); // 사용 중인 컨테이너 수
      })
      .catch(error => {
        console.log(error);
      });
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
      })
      .catch(error => {
        console.log(error);
      });
  }

  function onSrvRoomClickHandler() {
    navigate('/serverRoom');
    console.log('서버 룸으로 이동!');
  }

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
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-200px',
            bottom: '150px',
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '4px',
            border: '1px solid #DDDDDD',
            transform: 'scale(1)',
          }}
        >
          Container Count: {containerCount}
          <br />
          Container Usage: {containerUsage}
        </div>

        {/* PieChart */}
        <PieChart
          data={[
          {
            value: memData,
            color: '#F6CB44',
            name: 'name1',
          },
        ]}
          reveal={10}
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
        <button onClick={onSrvRoomClickHandler}>서버 룸</button>
      </div>
    </div>
  );
}

export default LandingPage;
