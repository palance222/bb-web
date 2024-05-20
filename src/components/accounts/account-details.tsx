export default function AccountDetails() {
  return (
    <>
      <div className="account-heading" style={{ backgroundColor: "#e9ecef" }}>
        <h3>Loan details</h3>
      </div>
      <div className="container" style={{ backgroundColor: "#e9ecef" }}>
        <p>Loan Number: 001-HL-30013896-2</p>
        <p>Loan Product Name: Home loans</p>
        <p>Loan Balance: 951218.29</p>
        <p>Loan Branch name: Atimonan</p>
        <p>Maturity Date: 09-14-2026</p>
        <p>Next Payment Due Date: 08-28-2023</p>
        <p>Loan Status: ACTIVE</p>
        <p>Tenure: 36</p>
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Payment date</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>08-28-2023</td>
              <td>951.00</td>
            </tr>

            <tr>
              <td>08-28-2023</td>

              <td>951.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
