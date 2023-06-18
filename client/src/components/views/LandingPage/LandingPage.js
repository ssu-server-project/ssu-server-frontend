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
        {/* Header 내용 생략 */}

      </header>
      <h2>시작 페이지</h2>
      <div
        style={{
          marginBottom: '425px',
          position: 'relative',
        }}
      >
        {/* memData 값 출력 */}
        {memData && (
          <div
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              backgroundColor: '#FFFFFF',
              padding: '20px',
              borderRadius: '4px',
              border: '1px solid #DDDDDD',
              transform: 'scale(3)',
            }}
          >
            Mem: {memData}
          </div>
        )}

        {/* 컨테이너 갯수 */}
        <div
          style={{
            position: 'absolute',
            right: '-200px',
            bottom: '140px',
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '4px',
            border: '1px solid #DDDDDD',
            transform: 'scale(1)',
          }}
        >
          Container Count: {containerCount}
        </div>

        {/* 사용 중인 컨테이너 수 */}
        <div
          style={{
            position: 'absolute',
            right: '-200px',
            bottom: '200px',
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '4px',
            border: '1px solid #DDDDDD',
            transform: 'scale(1)',
          }}
        >
          Container Usage: {containerUsage}
        </div>

        {/* PieChart */}
        <PieChart
          data={chartData}
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
