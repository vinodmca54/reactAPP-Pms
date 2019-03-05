import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import "../Home/Home.css";
import HistoryFinding from "../../components/HistoryFindings/HistoryFinding";
import Investigation from "../../components/Investigations/Investigation";
import Discharge from "../../components/Discharge-Advice/Discharge-Advice";
import { PatientRecordContext } from "../../contexts/PatientRecordContext";
import RetriveRecords from "../RetriveRecords/RetriveRecords";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: props.match.params.id,
      key: "home"
    };
    this.context.dispatch({ type: "SetPatientRecordId", data: this.state.id });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== nextProps.match.params.id) {
      return { id: nextProps.match.params.id, key: "home" };
    } else return null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.context.dispatch({
        type: "SetPatientRecordId",
        data: this.props.match.params.id
      });
      if (this.refs.history) {
        this.refs.history.updateState();
      }
    }
  }
  setTabName = name => {
    this.setState({ ...this.state, tabName: name });
  };
  render() {
    const { id, key } = this.state;
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
        <Tab eventKey="home" title="History & Findings">
          {key === "home" && <HistoryFinding id={id} ref="history" />}
        </Tab>
        <Tab eventKey="investigation" title="Investigation">
          {key === "investigation" && <Investigation id={id} />}
        </Tab>
        <Tab eventKey="course" title="Course in the Hospital" />
        <Tab eventKey="discharge" title="Discharge and Advice">
          {key === "discharge" && <Discharge />}
        </Tab>
        <Tab eventKey="retrive" title="Retrive Records">
          {key === "retrive" && <RetriveRecords />}
        </Tab>
      </Tabs>
    );
  }
}
export default Home;
Home.contextType = PatientRecordContext;
