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
    <div className="log-form">
      <div className="logo">
        <img src="src/assets/logo.png" alt="" />
      </div>
      <h2>Login to your account</h2>
      <form>
        <input type="text" title="username" placeholder="Username" />
        <input type="password" title="username" placeholder="Password" />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  </>
  );
}
