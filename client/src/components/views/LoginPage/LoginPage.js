import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";
function LoginPage(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 화면에서 글자가 쳐지고,, 하는 것들이 모두 이 안에서
  // 변화가 일어나는 것들이므로 state를 사용해서 값을 바꿔준다.
  // useState의 인자는 초기값이다.
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // event로 state가 전달된다.
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // page가 refresh되지 않도록
    // refresh가 되면 입력받은 뒤에 해야하는 일들을 하지 못한다.
    event.preventDefault();

    console.log("Email", Email);
    console.log("Password", Password);

    let body = {
      email: Email,
      password: Password,
    };

    // dispatch를 이용해서 Action을 취함.
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Fail to login. please check your ID/PW");
      }
      console.log(response.payload);
    });
  };
  const onRegisterHandler = () => {
        navigate("/register");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <header
        style={{
          marginBottom:"340px",
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
      <form
        style={{ display: "flex", flexDirection: "column", marginBottom:"400px" }}
        onSubmit={onSubmitHandler}
        onRegister={onRegisterHandler}
      >
        {/* 각 state를 value로 넣어줌*/}
        {/* 타이핑을 칠 때 onChange를  발생시켜서
         * 해당 state가 변화되도록 한다. */}
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <div
          style={{
            display:"flex",
            gap:"34px"
          }}>
          <button type="submit">Login</button>
          <button onClick={onRegisterHandler}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;