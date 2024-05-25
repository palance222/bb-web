import { useState, useEffect } from "react";
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
import { RecipientList } from "./components/transfers/recipient-list";

function App() {
  const [isLogin, loggedIn] = useState(0);
  
  useEffect(() => {
    if (!isLogin) {
      sessionStorage.removeItem('logged')
      //window.location.href='login';
    }
  }, [isLogin]);

  const pageRefConf = ((event:any) => {
    if (!sessionStorage.getItem('logged')) {
      console.log('hi')
      event.preventDefault()
    }
  })
  
  useEffect(() => {
    window.addEventListener('beforeunload', pageRefConf)
    return () => {
      window.removeEventListener('beforeunload', pageRefConf)
    }
  }, [])

  const PrivateRoute = ({ children }: any) => {
    return sessionStorage.getItem("logged") ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
  };

  const onVerifyLogin = () => {
    loggedIn(1)
  }

  return (
    <div className="container py-3">
      <Provider>
        <BrowserRouter>
          {(isLogin && sessionStorage.getItem("logged")) ? <NavBar /> : ''}
          <Routes>
            <Route path="/" Component={Login}></Route>
            <Route path="/auth" element={<Verification checkLogIn={onVerifyLogin} />}></Route>
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
            <Route
              path="/recipient-list"
              element={
                <PrivateRoute>
                  <RecipientList />
                </PrivateRoute>
              }
            />
            <Route path="/not-found" Component={NotFound}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
