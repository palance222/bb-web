import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { Provider } from "./shared/context";
import Footer from "./components/footer";
import { Login } from "./components/login/login";
import { NavBar } from "./components/navBar";
import NotFound from "./components/not-found";
import { Verification } from "./components/login/verification";
import Home from "./components/home/home";
import AccountList from "./components/accounts/account-list";
import AccountDetails from "./components/accounts/account-details";

function App() {
  useEffect(() => {
    const handleOnUnload = (event: any) => {
      event.preventDefault();
      sessionStorage.removeItem("logged");
    };
    window.addEventListener("onbeforeunload", handleOnUnload);
    return () => {
      window.removeEventListener("onbeforeunload", handleOnUnload);
    };
  }, [sessionStorage.removeItem("logged")]);

  const PrivateRoute = ({ children }: any) => {
    return sessionStorage.getItem("logged") ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <>
      <Provider>
        {sessionStorage.getItem("logged") && <NavBar />}
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Login}></Route>
            <Route path="/auth" Component={Verification}></Route>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/account-list"
              element={
                <PrivateRoute>
                  <AccountList />
                </PrivateRoute>
              }
            />
            <Route
              path="/account-details"
              element={
                <PrivateRoute>
                  <AccountDetails />
                </PrivateRoute>
              }
            />
            <Route path="/not-found" Component={NotFound}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <Footer />
    </>
  );
}

export default App;
