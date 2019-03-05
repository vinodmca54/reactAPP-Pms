import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "./logo.svg";
import "./App.css";
import indexRoutes from "../src/routes";
import PatientProvider from "./contexts/PatientRecordContext";
import { PatientRecordContext } from "./contexts/PatientRecordContext";
import Loader from "react-loader-spinner";

class App extends Component {
  render() {
    return (
      <PatientProvider>
        <PatientRecordContext.Consumer>
          {({ showSpinner }) => showSpinner && (
            <div className="loader">
              <Loader type="Circles" color="green" height={60} width={60} />
            </div>
          )}
        </PatientRecordContext.Consumer>
        <ToastContainer autoClose={2000} />
        <BrowserRouter>
          <Switch>
            {indexRoutes.map((prop, key) => {
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
        </BrowserRouter>
      </PatientProvider>
    );
  }
}

export default App;
