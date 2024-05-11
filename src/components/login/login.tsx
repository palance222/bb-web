import "./login.scss";

export function Login() {
  return (
    <>
      <form action="/auth" className="loginForm">
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="uname">Username:</label>
            <input type="text" className="form-control" id="uname" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" />
          </div>
          <button type="submit" style={{color:'#fff'}} className="btn btn-default" >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
