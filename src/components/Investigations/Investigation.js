import React, { Component } from "react";
import { toast } from "react-toastify";
import { Form, Button, Col, Card } from "react-bootstrap";
import { PatientRecordContext } from "../../contexts/PatientRecordContext";

export default class Investigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investigation: "",
      validated: false
    };
    this.patientId = null;
  }
  componentDidMount() {
    this.patientId = this.props.id;
    this.fetchInvestigationRecord();
  }
  async fetchInvestigationRecord() {
    this.context.dispatch({ type: "StartSpinner" });
    this.patientId = this.props.id;
    try {
      let response = await fetch(
        `http://localhost:8081/api/investigation/getByPatientId/${
          this.patientId
        }`,
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
      let response = await fetch("http://localhost:8081/api/investigation", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Origin": "*"
        },
        body: JSON.stringify({...this.state,patientId: this.patientId})
      });
      const Json = await response.json();
      toast.success("Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER
      });
      console.log("=======>INVESTIGATION POST RES", Json);
    }
  };
  render() {
    const { validated } = this.state;
    return (
      <div className="form">
        <Card style={{ width: "48rem" }}>
          <Card.Body>
            <Card.Title>Investigation</Card.Title>
            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
              <Form.Group as={Col}>
                <Form.Control
                  as="textarea"
                  rows="15"
                  value={this.state.investigation}
                  name="investigation"
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
  }
}
Investigation.contextType = PatientRecordContext;
