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

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success) {
          navigate("/login");
        } else {
          alert("Fail to logout.");
        }
        console.log(response.data)
      })
  }
  
  return (
    <div style= {{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h2> 시작 페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage;
