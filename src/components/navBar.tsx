import { Link } from "react-router-dom";
export function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Accounts</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" to="/">Transfer</Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">Inter-transfer</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">Intra-transfer</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
