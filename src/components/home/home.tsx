import "./home.scss";

import { useNavigate } from "react-router";

export default function Home() {
  let navigate = useNavigate();

  const accountListPage = () => {
    return navigate("/account-list");
  };

  const recipientListPage = () => {
    return navigate("/recipient-list");
  };

  return (
    <div className="col-md-6">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
        <div className="row g-0 cursor" onClick={accountListPage}>
          <div className="col-md-2 card-container">
            <img
              src="src/assets/account-icon.png"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col p-4 d-flex flex-column position-static">
            <h3 className="mb-0">Accounts</h3>
            <div className="card-body mt-3">
              <p className="card-text mb-auto">
                Loan account <br />
                Deposit account <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
        <div className="row g-0 cursor" onClick={recipientListPage}>
          <div className="col-md-2 card-container">
            <img
              src="src/assets/transfer-icon.png"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col p-4 d-flex flex-column position-static">
            <h3 className="mb-0">Fund transfer</h3>
            <div className="card-body mt-3">
              <p className="card-text mb-auto">
                Inter transfer <br />
                Intra transfer <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
