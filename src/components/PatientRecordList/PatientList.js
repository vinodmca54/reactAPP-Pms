import React, { Component } from "react";
import { PatientRecordContext } from "../../contexts/PatientRecordContext";

class PatientList extends Component {
  render() {
    return (
      <PatientRecordContext.Consumer>
        {( {record} ) => {
          const { name } = record;
          return <div>{name}</div>;
        }}
      </PatientRecordContext.Consumer>
    );
  }
}
export default PatientList;
