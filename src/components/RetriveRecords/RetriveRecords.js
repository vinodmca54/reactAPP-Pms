import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  CardDeck
} from "react-bootstrap";
import { Form, Button, Col, Card, Table } from "react-bootstrap";
import "./RetriveRecords.css";

class RetriveRecords extends Component {
  constructor(props) {
    super();
    this.state = {
      fromDate: "",
      toDate: "",
      validated: false
    };
  }

  handleChange = event => {
    alert("onchange is called");
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  handleSubmit = async event => {
    const { fromDate, toDate } = this.state;
    alert("calling subbmit");
    console.log(this.state);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
    if (form.checkValidity()) {
      console.log("function enter imto sending data");
      let response = await fetch(
        `http://localhost:8081/api/registration?fromDate=${fromDate}&toDate=${toDate}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
          }
        }
      );
      const Json = await response.json();
      console.log("responce in business component", response);
      if (Json.success) {
        this.setState({ success: true });
        //this.props.modalClose();
        toast.success("data fetch Successfully !", {
          position: toast.POSITION.TOP_CENTER
        });
        //this.props.history.push(`/home/${Json.data._id}`);
        //this.props.update(Json.data);
      }
    }
  };

  render() {
    const { validated } = this.state;
    return (
      <div className="form">
        <Card style={{ width: "48rem" }}>
          <Card.Header>Search Patient Records</Card.Header>
          <Card.Body>
            <form
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="From Date"
                    value={this.state.fromDate}
                    name="fromDate"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="To date"
                    value={this.state.toDate}
                    name="toDate"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Row>
            </form>
          </Card.Body>
        </Card>

        <Card className="cardstyle">
          <Card.Header
            style={{
              backgroundColor: "#96966b",
              color: "#00BFFF",
              fontWeight: 500,
              fontSize: "1.3rem"
            }}
          >
            Search Results
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>IP.NO</th>
                  <th>Patient Name</th>
                  <th>Final Diagnosis</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>DOA</th>
                  <th>DOD</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <span className="d-inline-block">
                      <FontAwesomeIcon
                        icon={["fas", "edit"]}
                        //onClick={this.handleShow}
                        style={{ color: "#00BFFF" }}
                      />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <span className="d-inline-block">
                      <FontAwesomeIcon
                        icon={["fas", "edit"]}
                        //onClick={this.handleShow}
                        style={{ color: "#00BFFF" }}
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default RetriveRecords;

{
  /* <div>
              <input
                style={{ width: "45rem" }}
                placeholder="Search for..."
                // value={this.state.query}
                // onChange={this.handleInputChange}
              />
            </div> */
}

{
  /* <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>
                    <span className="d-inline-block">
                      <FontAwesomeIcon
                        icon={["fas", "edit"]}
                        style={{ color: "#00BFFF" }}
                        //onClick={this.handleShow}
                      />
                    </span>
                  </td>
                </tr> */
}
