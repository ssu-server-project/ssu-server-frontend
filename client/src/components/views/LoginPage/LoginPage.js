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
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        // submit이 되면 handler가 실행된다.
        onSubmit={onSubmitHandler}
      >
        {/* 각 state를 value로 넣어줌*/}
        {/* 타이핑을 칠 때 onChange를  발생시켜서
         * 해당 state가 변화되도록 한다. */}
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage