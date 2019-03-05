import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, ModalBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import Registration from "../../components/Registration/Registration";
import { Link } from "react-router-dom";
import { PatientRecordContext } from "../../contexts/PatientRecordContext";

export class SideNav extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false
    };
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  updateRecord = record => {
    this.state.records.unshift(record);
    this.setState({ records: this.state.records });
  };
  searchText = e => {
    if (!e.target.value) {
      this.setState({ records: this.patientRecords });
      return;
    }
    const updatedList = this.state.records.filter(record =>
      record.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({ records: updatedList });
  };
  async componentDidMount() {
    let response = await fetch("http://localhost:8081/api/registration", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Origin": "*"
      }
    });
    this.patientRecords = await response.json();
    this.setState({ records: this.patientRecords });
  }

  render() {
    const { records } = this.state;
    return (
      <PatientRecordContext.Consumer>
        {({ id }) => {
          return (
            <div className="leftPanel">
              <Form noValidate>
                <Form.Group className="searchBox">
                  <Form.Control
                    required
                    name="searchText"
                    type="search"
                    onChange={this.searchText}
                    placeholder="Search..."
                  />
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">Register Patient</Tooltip>
                    }
                  >
                    <span className="d-inline-block">
                      <FontAwesomeIcon
                        icon={["fas", "user-plus"]}
                        onClick={this.handleShow}
                      />
                    </span>
                  </OverlayTrigger>
                  <Modal
                    size="lg"
                    show={this.state.show}
                    onHide={this.handleClose}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Patient Registration
                      </Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                      <Registration
                        modalClose={this.handleClose}
                        history={this.props.history}
                        update={this.updateRecord}
                      />
                    </ModalBody>
                  </Modal>
                </Form.Group>
              </Form>

              <div className="search-list">
                {records &&
                  records.map((record, key) => {
                    return (
                      <Link
                        key={key}
                        to={`/home/${record._id}`}
                        className={record._id === id ? "active-select" : ""}
                      >
                        {record.name}
                      </Link>
                    );
                  })}
              </div>
            </div>
          );
        }}
      </PatientRecordContext.Consumer>
    );
  }
}
export default withRouter(SideNav);
