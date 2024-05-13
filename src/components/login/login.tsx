import { useState } from "react";
import {Context as context} from "../../shared/context"
import "./login.scss";

export function Login() {
  const auth = context();
  const [login, setLogin] = useState({username: "", password: "", "error": ""});

  const onLogin = () => {
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
      debugger;
      if (data && data.status === 'mfa') {
        auth.setState((prevState: any) => ({
          ...prevState,
          error: '',
          success: '',
          loading: false,
          secure: {
            hash: data.hash,
            session: data.session,
            username: login.username,
          },
          pwd: login.password,
        }));
      } else {
        auth.setState((prevState: any) => ({
          ...prevState,
          error: 'Invalid username or password',
          success: '',
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
      <form onSubmit={onLogin} className="loginForm">
        <div className="form-container">
          {login.error && <div>{login.error}</div>}
          <div className="form-group">
            <label htmlFor="uname">Username:</label>
            <input type="text" onChange={handleInput('username')} className="form-control" id="uname" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" onChange={handleInput('password')} className="form-control" id="pwd" />
          </div>
          <button type="submit" style={{color:'#fff'}} className="btn btn-default" >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
