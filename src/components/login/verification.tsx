import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {Context as context} from "../../shared/context"
import "./verification.scss";

export function Verification() {
  const auth = context();
  let navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<any>([]);
  
  const handleChange = (index:any) => (e:any) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    // Move focus to the next box if the current one has a value
    if (e.target.value && index < newOtp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handlekeyDown = (index:any) => (event: any) => {
    if (event.code === 'Backspace' && otp[index] === '') {
      if (index >= 1) {
        inputs.current[index - 1].focus();
      }

      if (index > 0) {
        const otpCopy = otp.concat();
        otpCopy[index - 1] = ''; // clear the previous box which will be in focus
        setOtp(otpCopy);
      }
    }
  }
  const refCallback = (index:any) => (input:any) => {
    inputs.current[index] = input;
  };

  const onConfirm = () => {
    let params = {};
    params = {...auth.state.secure, code: otp.toString().split(',').join('')};
    auth.setState((prevState :any)=> ({
      ...prevState,
      loading: true,
    }));
    auth.saveMFA(params).then((data:any) => {
      if (data.code && data.code === 'Successful') {
        auth.setState((prevState :any) => ({
          ...prevState,
          loading: false,
          secure: '',
          pwd: '',
          userName: data.clientuser.userName,
          sessionId: data.session.accessToken.JwtToken,
          clientId: data.clientuser.clientId,
        }));
        //onVerification(data.clientuser.clientId);
        navigate('/not-found');
      } else {
        auth.setState((prevState :any) => ({
          ...prevState,
          loading: false,
          secure: '',
          sessionId: '',
          pwd: '',
          error: 'Error in submitting SMS code, Need to relogin'
        }));
        navigate('/');
      }
    });
  };

  return (
    <>
      <div className="title-container">
        <p>Verification</p>
        <p>We sent your SMS Code on your registered phone number with us</p>
      </div>
      <div className="container">
        <div id="inputs" className="inputs">
        {otp.map((digit, index) => (
          <input
            className="input"
            type="text"
            value={digit}
            inputMode="numeric"
            maxLength={1}
            key={index}
            onKeyDown={handlekeyDown(index)}
            onChange={handleChange(index)}
            ref={refCallback(index)}
          />))}
        </div>
      </div>
      <div className="btn-container">
        <button
          type="submit"
          style={{ color: "#fff" }}
          className="btn btn-success"
        >
          Resend
        </button>
        <button
          type="submit"
          style={{ color: "#fff" }}
          className="btn btn-danger"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
