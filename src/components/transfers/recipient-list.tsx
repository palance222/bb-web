import { useEffect, useState } from "react";
import { Context as context } from "../../shared/context";
import "./recipient-list.scss";
import { useNavigate } from "react-router";

export function RecipientList() {
  const auth = context();
  const [receipient, setRecipient] = useState({
    loading: false,
    receipientDetails: [],
  });
  let navigate = useNavigate();
  const addRecipientPage = () => {
    return navigate("/add-recipient");
  };

  const recipientDetailsPage = (data:any) => () => {
    return navigate("/recipient-details",{
        state:data,
      });
  };

  useEffect(() => {
    setRecipient((prevState) => ({
      ...prevState,
      loading: true,
    }));
    auth.listRecipient(auth.state.clientId).then((data: any) => {
      if (data.recipients.length) {
        setRecipient((prevState) => ({
          ...prevState,
          receipientDetails: data.recipients,
          loading: false,
        }));
      } else {
        setRecipient((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    });
  }, []);

  return (
    <>
    <div className="btn-container">
         <p> <td className="arrow"><button className="btn btn-success" onClick={addRecipientPage}>Add Recipeint</button></td></p>
        </div>
      <div className="container">

        <div className="list-container" style={{ backgroundColor: "#77a19e" }}>
          <h3>Recipient list</h3>
        </div>
        <div className="recipient-table">
          <table id="table1" className="table list-container-table">
            <tbody>
              {receipient.receipientDetails.map((data: any, index:any) => {
                return (
                  <tr>
                    <td className="name">
                      {data.firstName} {data.lastName} <br />
                      {data.accountNumber}
                    </td>
                    <td className="arrow"><button className="btn btn-success" onClick={recipientDetailsPage(data)}>Transfer</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
