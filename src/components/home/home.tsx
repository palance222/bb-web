import "./home.scss";

import { useNavigate } from "react-router";

export default function Home() {
  let navigate = useNavigate();

  const accountListPage = () => {
    return navigate("/account-list");
  };

  return (
    <>
      <div className="container">
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0 " onClick={accountListPage}>
            <div className="col-md-4 card-container">
              <img
                src="src/assets/account-icon.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Accounts</h5>

                <p className="card-text">
                  Loan account <br />
                  Deposit account <br />

                </p>

              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0 ">
            <div className="col-md-4 card-container">
              <img
                src="src/assets/transfer-icon.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Fund transfer</h5>

                <p className="card-text">
                  Inter transfer <br />
                  Intra transfer <br />

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
