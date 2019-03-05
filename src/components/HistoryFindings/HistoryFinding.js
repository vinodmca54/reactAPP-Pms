import React, { Component } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { PatientRecordContext } from "../../contexts/PatientRecordContext";

export default class HistoryFinding extends Component {
  constructor(props) {
    super(props);
    this.formObj = {
      diagnosis: "",
      history: "",
      findings: "",
      validated: false
    };
    this.state = this.formObj;
    this.patientId = null;
  }
  updateState() {
    this.fetchHistoryRecord();
  }
  componentDidMount() {
    this.fetchHistoryRecord();
  }
  async fetchHistoryRecord() {
    this.context.dispatch({ type: "StartSpinner" });
    this.patientId = this.props.id;
    try {
      let response = await fetch(
        `http://localhost:8081/api/history/getByPatientId/${this.patientId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
          }
        }
      );
      let history = await response.json();
      this.context.dispatch({ type: "StopSpinner" });
      this.setState(history);
    } catch (err) {
      console.log("======Error==>", err.message);
      this.setState({ ...this.formObj, _id: null });
      this.context.dispatch({ type: "StopSpinner" });
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    this.setState({ validated: true });
    if (form.checkValidity()) {
      try {
        let response = await fetch("http://localhost:8081/api/history", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
          },
          body: JSON.stringify({ ...this.state, patientId: this.patientId })
        });
        const Json = await response.json();
        toast.success("Updated Successfully !", {
          position: toast.POSITION.TOP_CENTER
        });
      } catch (e) {}
    }
  };
  render() {
    const { validated, history, diagnosis, findings } = this.state;
    return (
      <PatientRecordContext.Consumer>
        {({ dispatch }) => {
          return (
            <div className="form">
              <Card>
                <Card.Body>
                  <Card.Title>History Findings</Card.Title>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={this.handleSubmit}
                  >
                    <Form.Group as={Col}>
                      <Form.Label>Diagnosis</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={diagnosis}
                        name="diagnosis"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>History</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={history}
                        name="history"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Findings</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={findings}
                        name="findings"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          );
        }}
      </PatientRecordContext.Consumer>
    );
  }
}
HistoryFinding.contextType = PatientRecordContext;
