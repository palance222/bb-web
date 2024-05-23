import { useEffect, useState } from "react";
import { Context as context } from "../../shared/context";
import "./recipient-list.scss";

export function RecipientList() {
  const auth = context();
  const [receipient, setRecipient] = useState({
    loading: false,
    receipientDetails: [],
  });

  const data = {
    status: "success",
    recipients: [
      {
        id: "714325e3-bbb4-11ee-b37f-02a955dfe814",
        firstName: "Sathish",
        lastName: "Peso123",
        accountNumber: "123412341234",
        is_intrabank: 0,
        bic: "DMBNPHM1XXX",
        name: "DM Bank",
      },
      {
        id: "22ebff91-baec-11ee-b37f-02a955dfe814",
        firstName: "Sathish",
        lastName: "Pesonet2",
        accountNumber: "123456",
        is_intrabank: 0,
        bic: "DMBNPHM1XXX",
        name: "DM Bank",
      },
      {
        id: "a08da80c-bae7-11ee-b37f-02a955dfe814",
        firstName: "Sathish",
        lastName: "Pesonet",
        accountNumber: "1234567890",
        is_intrabank: 0,
        bic: "DMBNPHM1XXX",
        name: "DM Bank",
      },
      {
        id: "df88160a-baac-11ee-b37f-02a955dfe814",
        firstName: "Push",
        lastName: "M",
        accountNumber: "123498765",
        is_intrabank: 0,
        bic: "DMBNPHM1XXX",
        name: "DM Bank",
      },
      {
        id: "2865d3da-920d-11ee-b37f-02a955dfe814",
        firstName: "Bea",
        lastName: "Marie",
        accountNumber: "001-51-492789-11",
        is_intrabank: 1,
        bic: null,
        name: null,
      },
      {
        id: "df883a05-8ed6-11ee-b37f-02a955dfe814",
        firstName: "Murugan",
        lastName: "M",
        accountNumber: "007-51-265653-4",
        is_intrabank: 1,
        bic: null,
        name: null,
      },
      {
        id: "5cda72fe-8e01-11ee-b37f-02a955dfe814",
        firstName: "Rajeshwari",
        lastName: "M",
        accountNumber: "001-51-10012157-2",
        is_intrabank: 1,
        bic: null,
        name: null,
      },
    ],
  };

  useEffect(() => {
    setRecipient((prevState) => ({
      ...prevState,
      loading: true,
    }));
    auth.listRecipient(auth.state.clientId).then((data: any) => {
      console.log("list recipient", data);
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
         <p> <td className="arrow"><button className="btn btn-success">Add Recipeint</button></td></p>
        </div>
      <div className="container">

        <div className="list-container" style={{ backgroundColor: "#77a19e" }}>
          <h3>Recipeint list</h3>
        </div>
        <div className="recipient-table">
          <table id="table1" className="table table-bordered">
            <tbody>
              {receipient.receipientDetails.map((data: any) => {
                return (
                  <>
                    <tr>
                      <td className="name">
                        {data.firstName} {data.lastName} <br />
                        {data.accountNumber}
                      </td>
                      <td className="arrow"><button className="btn btn-success">Transfer</button></td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
