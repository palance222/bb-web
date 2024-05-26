import { useLocation, useNavigate } from "react-router";
import { Context as context } from "../../shared/context";
import "./recipient-details.scss";
import { useEffect, useState } from "react";

export function RecipientDetails() {
  let route = useLocation();
  let navigate = useNavigate();
  const auth = context();
  const [show, SetShow] = useState(false);
  const [avaiBalance, setAvailBalance] = useState(0);

  const setEnable = () => {
    SetShow(true);
  };

  const onCancel = () => {
    navigate('/recipient-list');
  }


  const [state, setState] = useState({
    amount: '',
    error: '',
    loading: false,
    accounts: []
  });

  const selectedInput = ((data:any)=> () => {
    setAvailBalance(data.availableBalance)
  })

  const onTransferAmount = () => {
    setState(prevState => ({
      ...prevState,
      loading: true,
    }));
    auth
      .moneyTransfer(
        selected.accountId,
        auth.state.fundsView.id,
        state.amount,
        auth.state.fundsView.is_intrabank
      )
      .then((data:any) => {
        if (data.status === 'success') {
          
          console.log('Fund transfer completed successfully');
        } else {
          setState(prevState => ({
            ...prevState,
            error: data.code,
            loading: false,
          }));
        }
      });
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const data ={
        "status": "success",
        "accounts": [
            {
                "accountId": 501272,
                "accountNumber": "001-51-30013896-1",
                "availableBalance": "9242.23",
                "productName": "Savings account"
            },
            {
                "accountId": 501354,
                "accountNumber": "001-51-30013896-2",
                "availableBalance": "1199.00",
                "productName": "Savings account"
            }
        ]
    }

    auth.listAccounts("deposit", auth.state.clientId).then((data:any) => {
        console.log(auth.state.clientId);
        console.log("list",data);
      if (data.status === "success") {
        setState((prevState) => ({
          ...prevState,
          accounts: data.accounts,
          loading: false,
        }));
      }
    });
  }, []);

  return (
    <>
      <h3>Recipient Details</h3>
      <div className="container">
        <div className="details">
          <p className="name">{route.state.accName}</p>
          <p className="number">{route.state.accNumber}</p>
          <p className="bank">{route.state.bankName}</p>
          <button className="btn btn-success" onClick={setEnable}>
            Pay
          </button>
        </div>
        <div className="form-container" hidden={show ? false : true}>
          <h4>Payee Details</h4>
          <form onSubmit={onTransferAmount}>
          <p>
            <label htmlFor="name">
              Name : <span> {route.state.accName} </span>
            </label>
          </p>
          <p>
            <label htmlFor="name">
              Branch Name : <span> {route.state.bankName} </span>
            </label>
          </p>
          <p>
            <label htmlFor="name">
              Account Number : <span> {route.state.accName} </span>
            </label>
          </p>
          <p>
          <select className="form-select" aria-label="Default select example" >
            {state.accounts.map((data: any) => {
                return (
                  <>
                    <option value='Select Account' onChange={selectedInput(data)} >{data.accountNumber}</option>
                  </>
                );
              })} 
              
            </select>
          </p>
          <p>
            <label htmlFor="name">
              Available Balance : <span> {avaiBalance} </span>
            </label>
          </p>
          <p>
            <label htmlFor="name">
              Amount :
              <span>
                {" "}
                <input type="text" placeholder="XXXX"/>
              </span>
            </label>
          </p>
          </form>
          <div className="action">
            <button className="btn btn-success" onClick={setEnable}>
              Send
            </button>
            <button className="btn btn-success"onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
