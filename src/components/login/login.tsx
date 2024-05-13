import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Context as context} from "../../shared/context"
import "./login.scss";

export function Login() {
  const auth = context();
  let navigate = useNavigate();
  const [login, setLogin] = useState({username: "", password: "", "error": ""});

  const onLogin = (event: any) => {
    event.preventDefault();
    if (!login.username) {
      setLogin(prevState => ({
        ...prevState,
        'error': 'Please fill Username',
      }));
      return;
    }
    if (!login.password) {
      setLogin(prevState => ({
        ...prevState,
        'error': 'Please fill Password',
      }));
      return;
    }

    auth.saveToken(login).then((data:any) => {
      if (data && data.status === 'mfa') {
        auth.setState((prevState: any) => ({
          ...prevState,
          error: '',
          loading: false,
          secure: {
            hash: data.hash,
            session: data.session,
            username: login.username,
          },
          pwd: login.password,
        }));
        return navigate("/auth");
      } else {
        auth.setState((prevState: any) => ({
          ...prevState,
          error: 'Invalid username or password',
          loading: false,
        }));
      }
    });
  }

  const handleInput = (name:any) => (e:any) => {
    setLogin(prevState => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  return (
    <>
    <div className="log-form">
      {auth.state.error && <span>{auth.state.error}</span>}
      <div className="logo">
        <img src="src/assets/logo.png" alt="" />
      </div>
      <h2>Login to your account</h2>
      {login.error && <span>{login.error}</span>}
      <form onSubmit={onLogin}>
        <input type="text" title="username" onChange={handleInput("username")} placeholder="Username" />
        <input type="password" title="username" onChange={handleInput("password")} placeholder="Password" />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  </>
  );
}
