import { useEffect, useState } from "react";
import { Context as context } from "../../shared/context";
import "./add-recipient.scss";

export function AddRecipient(this: any) {
  const auth = context();
  const [radioValue, setRadiovalue] = useState("Intrabank");
  const transferCheck = (e: any) => {
    setRadiovalue(e.target.value);
  };

  const [state, setAdd] = useState({
    transferType: 0,
    firstname: '',
    lastname: '',
    accountnumber: '',
    confirmaccountnumber: '',
    error: '',
    loading: false,
    banks: [],
    bic: '',
    bankname: '',
  });

  useEffect(() => {
    // if (state.transferType) {
      setAdd(prevState => ({
        ...prevState,
        loading: true,
      }));
      auth.getPesonetBanklist().then((data: any) => {
        console.log("bank list",data);
        if (data.status === 'success') {
          setAdd(prevState => ({
            ...prevState,
            banks: data.banks,
            loading: false,
          }));
        }
      });
    // }
  }, []);

  return (
    <>
      <div className="add-container">
        <h3>Create recipient</h3>
        <div className="form-container">
          <div className="rd">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioTranfer"
                id="exampleRadios1"
                value="Intrabank"
                onChange={transferCheck}
                checked={radioValue === "Intrabank"}
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
                Intrabank transfer
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioTranfer"
                id="exampleRadios2"
                value="Interbank"
                onChange={transferCheck}
                checked={radioValue === "Interbank"}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
                Interbank transfer
              </label>
            </div>
          </div>

          <div className="select-input" hidden={radioValue === "Interbank" ? false : true}>
            <select className="form-select" aria-label="Default select example">
            {state.banks.map((data: any) => {
                return (
                  <>
                    <option value='Select account'>{data.bank_name}</option>
                  </>
                );
              })}
              
            </select>
          </div>
          <input
            className="form-control"
            type="text"
            placeholder="First name"
          ></input>
          <input
            className="form-control"
            type="text"
            placeholder="Last name"
          ></input>
          <input
            className="form-control"
            type="text"
            placeholder="Account number"
          ></input>
          <input
            className="form-control"
            type="text"
            placeholder="confirm account number"
          ></input>
          <div className="btn">
            <button className="btn btn-success">Add </button>
            <button className="btn btn-success">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
