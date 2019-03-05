import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  Form,
  Button,
  Col,
  Card,
  DropdownButton,
  Dropdown,
  Alert
} from "react-bootstrap";
import "./Registration.css";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      address: "",
      gender: "",
      staff: "",
      contactNumber: "",
      unitStaff: "",
      unitChief: "",
      mrNumber: "",
      patId: "",
      admissionDate: "",
      dischageDate: "",
      arrivalTime: "",
      ipType: "",
      bloodGroup: "",
      paymentType: "",
      validated: false,
      success: false
    };
  }

  handleSubmit = async event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
    if (form.checkValidity()) {
      let response = await fetch("http://localhost:8081/api/registration", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Origin": "*"
        },
        body: JSON.stringify(this.state)
      });
      const Json = await response.json();
      if (Json.success) {
        this.setState({ success: true });
        this.props.modalClose();
        toast.success("Registered Successfully !", {
          position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push(`/home/${Json.data._id}`);
        this.props.update(Json.data);
      }
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSelect = (eventKey, event) => {
    this.setState({ [event.target.name]: eventKey });
  };

  render() {
    const { validated } = this.state;
    return (
      <div className="form">
        <Card style={{ width: "48rem" }}>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    required
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={this.state.age}
                    name="age"
                    onChange={this.handleChange}
                    placeholder="Age"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  placeholder="1234 Main St"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  maxLength="10"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.contactNumber}
                  name="contactNumber"
                  onChange={this.handleChange}
                  maxLength="10"
                  placeholder="Phone Number"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Unit Staff</Form.Label>
                <Form.Control
                  required
                  value={this.state.unitStaff}
                  name="unitStaff"
                  onChange={this.handleChange}
                  type="text"
                  maxLength="10"
                  placeholder="Unit Staff"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Unit Chief</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="10"
                  value={this.state.unitChief}
                  name="unitChief"
                  onChange={this.handleChange}
                  placeholder="Unit Chief"
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>MR.NO</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MR.NO"
                    value={this.state.mrNumber}
                    name="mrNumber"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Pat.ID</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Pat.ID"
                    value={this.state.patId}
                    name="patId"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Admission Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Date of Admission"
                    value={this.state.admissionDate}
                    name="admissionDate"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Discharge Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Discharge Date"
                    value={this.state.dischageDate}
                    name="dischageDate"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Time of Arrival</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Time of Arrival"
                    value={this.state.arrivalTime}
                    name="arrivalTime"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>IpType</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Bed No"
                    value={this.state.ipType}
                    name="ipType"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Blood Group"
                    value={this.state.bloodGroup}
                    name="bloodGroup"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Staff</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="staff"
                    value={this.state.staff}
                    name="staff"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Gender</Form.Label>
                  <DropdownButton
                    title={this.state.gender || "Select"}
                    onSelect={this.handleSelect}
                  >
                    <Dropdown.Item
                      name="gender"
                      eventKey="male"
                      value={this.state.gender}
                    >
                      Male
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="gender"
                      eventKey="female"
                      value={this.state.gender}
                    >
                      Female
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Cash/Cr Bill</Form.Label>
                  <DropdownButton
                    title={this.state.paymentType || "Select"}
                    onSelect={this.handleSelect}
                  >
                    <Dropdown.Item
                      name="paymentType"
                      eventKey="cash"
                      value={this.state.paymentType}
                    >
                      Cash
                    </Dropdown.Item>
                    <Dropdown.Item
                      name="paymentType"
                      eventKey="credit"
                      value={this.state.paymentType}
                    >
                      Credit
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        );
      </div>
    );
  }
}
