import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { Provider } from "./shared/context";
import Footer from "./components/footer";
import { Login } from "./components/login/login";
import { NavBar } from "./components/navBar";
import NotFound from "./components/not-found";
import { Verification } from "./components/login/verification";

function App() {
  return (
    <>
    <Provider>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login}></Route>
          <Route path="/auth" Component={Verification}></Route>
          <Route path="/not-found" Component={NotFound}></Route>
        </Routes>
      </BrowserRouter>
      </Provider>
      <Footer />
    </>
  );
}

export default App;
