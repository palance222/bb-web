import "./verification.scss";

export function Verification() {
  return (
    <>
      <div className="title-container">
        <p>Verification</p>
        <p>We sent youa SMS Code on your registered phone number with us</p>
      </div>
      <div className="container">
        <div id="inputs" className="inputs">
          <input
            className="input"
            type="text"
            inputMode="numeric"
            maxLength={1}
          />
          <input
            className="input"
            type="text"
            inputMode="numeric"
            maxLength={1}
          />
          <input
            className="input"
            type="text"
            inputMode="numeric"
            maxLength={1}
          />
          <input
            className="input"
            type="text"
            inputMode="numeric"
            maxLength={1}
          />
          <input
            className="input"
            type="text"
            inputMode="numeric"
            maxLength={1}
          />
          <input
            className="input"
            type="text"
            inputMode="numeric"
            maxLength={1}
          />
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
        >
          Confirm
        </button>
      </div>
    </>
  );
}
