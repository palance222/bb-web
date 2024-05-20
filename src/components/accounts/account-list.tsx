import { useEffect, useState } from "react";

import { Context as context } from "../../shared/context";

import { useNavigate } from "react-router-dom";

import "./account-list.scss";

export default function AccountList() {
  const auth = context();

  let navigate = useNavigate();

  const accountDetailsPage = () => {
    return navigate("/account-details");
  };

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
        <div className="card border-success mb-3" style={{ maxWidth: "18rem" }}>
          <div className="card-header">Loan Accounts </div>

          <div className="card-body text-success">
            {accountsData.loan.map((data: any) => {
              return (
                <>
                  <table className="data-table">
                    <tbody>
                      <tr onClick={accountDetailsPage}>
                        <td key={data.loanNumber}></td>

                        <td key={data.principalBalance}>
                          <span>Loan Balance: </span> 
                        </td>

                        <td key={data.productName}></td>
                      </tr>
                    </tbody>
                  </table>
                </>
              );
            })}
          </div>
        </div>

        <div className="card border-success mb-3" style={{ maxWidth: "18rem" }}>
          <div className="card-header">Deposit Accounts </div>

          <div className="card-body text-success">
            {accountsData.deposit.map((data: any) => {
              return (
                <>
                  <table className="data-table">
                    <tbody>
                      <tr onClick={accountDetailsPage}>
                        <td>{data.accountNumber}</td>

                        <td>
                          <span>Loan Balance: </span> {data.availableBalance}
                        </td>

                        <td>{data.productName}</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
