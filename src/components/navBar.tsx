import { Link } from "react-router-dom";

const logOut = () => {
  sessionStorage.removeItem("logged");
};
export function NavBar() {
  return (
    <header>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <Link className="d-flex align-items-center link-body-emphasis text-decoration-none" to="/">
          <img src="src/assets/logo.png" width="180px" alt="" />
        </Link>
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <Link className="me-3 py-2 link-body-emphasis text-decoration-none" to="/home">Home</Link>
          <Link className="me-3 py-2 link-body-emphasis text-decoration-none" to="/account-list">Accounts</Link>
          <Link className="me-3 py-2 link-body-emphasis text-decoration-none" to="/recipient-list">Transfers</Link>
          <Link className="me-3 py-2 link-body-emphasis text-decoration-none" to="/" onClick={logOut}>Logout</Link>
        </nav>
      </div>
    </header>
  );
}
