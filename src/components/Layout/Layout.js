import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Registration from "../Registration/Registration";
import PatientList from "../../components/PatientRecordList/PatientList";
import HistoryFinding from "../../components/HistoryFindings/HistoryFinding";
import Home from "../Home/Home";
import SideNav from "../Layout/SideNav";

const appRoutes = [
  {
    path: "/register",
    component: Registration
  },
  {
    path: "/getRecord",
    component: PatientList
  },
  {
    path: "/home/:id",
    component: Home
  },
  {
    path: "/:id/history-finding",
    component: HistoryFinding
  },
  { redirect: true, path: "/", to: "/" }
];
class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="Main">
          <SideNav />
          <div className="main-nav">
            <Switch>
              {appRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                    exact={true}
                  />
                );
              })}
            </Switch>
          </div>
          <Footer className="footer" />
        </div>
      </div>
    );
  }
}

export default Layout;
