import React , {useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

  // Axios를 통해서 get 방식으로 /api/hello에 request를 보냄.
  // 보낼 시 해당 data를 콘솔에 찍어주도록 함. 
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  },[])
  
  return (
    <div style= {{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h2> 시작 페이지</h2>
    </div>
  )
}

export default LandingPage
