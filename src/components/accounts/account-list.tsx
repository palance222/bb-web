import { useEffect, useState } from "react";
import { Context as context } from "../../shared/context";
import { useNavigate } from "react-router-dom";

export default function AccountList() {
  const auth = context();

  let navigate = useNavigate();

  const [accountsData, setAccounts] = useState({
    loan: [],

    deposit: [],

    loanLoading: false,

    depositLoadng: false,

    clientDetails: "",
  });

  useEffect(() => {
    console.log("client id", auth);

    auth
      .findClient(auth.state.clientId)
      .then((data: { status: string; client: any }) => {
        if (data.status === "success") {
          setAccounts((prevState) => ({
            ...prevState,

            clientDetails: data.client,
          }));
        }
      });
  }, []);

  useEffect(() => {
    setAccounts((prevState) => ({
      ...prevState,

      loanLoading: true,
    }));

    auth.listAccounts("loan", auth.state.clientId).then((data: any) => {
      if (data?.loans?.length) {
        setAccounts((prevState) => ({
          ...prevState,

          loan: data.loans,

          loanLoading: false,
        }));
      } else {
        setAccounts((prevState) => ({
          ...prevState,

          loanLoading: false,
        }));
      }
    });
  }, []);

  useEffect(() => {
    setAccounts((prevState) => ({
      ...prevState,

      depositLoading: true,
    }));

    auth.listAccounts("deposit", auth.state.clientId).then((data: any) => {
      if (data?.accounts?.length) {
        setAccounts((prevState) => ({
          ...prevState,

          deposit: data.accounts,

          depositLoading: false,
        }));
      } else {
        setAccounts((prevState) => ({
          ...prevState,

          depositLoading: false,
        }));
      }
    });
  }, []);

  console.log("account:", typeof accountsData);

  console.log("account:", accountsData);

  const objectList = Object.keys(accountsData).map((k: any) => (
    <li key={k}>
      <strong>{k}</strong>: {accountsData.loan}
    </li>
  ));

  return (
    <>
      <div className="account-heading" style={{ backgroundColor: "#77a19e" }}>
        <h3>Welcome to Bayanihan Bank</h3>

        <p>
          Account:
          <span>{auth.state.userName ? " " + auth.state.userName : ""}</span>
        </p>
      </div>

      <div className="container">
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0 ">
            <div className="col-md-4 card-container">
              <img
                src="src/assets/account-icon.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Loan Accounts </h5>

                <p className="card-text">
                  {/* {JSON.stringify(accountsData.loan[0])} */}

                  {objectList}
                </p>

                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
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
                <h5 className="card-title">Deposit Accounts</h5>

                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>

                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
