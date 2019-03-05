import React from "react";

export const PatientRecordContext = React.createContext();

class PatientRecordProvider extends React.Component {
  constructor(props) {
    super(props);
    const reducer = (state, action) => {
      switch (action.type) {
        case "GetPatientRecordId":
          return {
            id: state.id
          };
        case "SetPatientRecordId":
          return {
            ...state,
            id: action.data
          };
        case "StartSpinner":
          return {
            ...state,
            showSpinner: true
          };
        case "StopSpinner":
          return {
            ...state,
            showSpinner: false
          };
        case "default":
          return state;
      }
    };

    this.state = {
      id: null,
      showSpinner: false,
      dispatch: action => {
        this.setState(state => reducer(state, action));
      }
    };
  }

  render() {
    return (
      <PatientRecordContext.Provider value={this.state}>
        {this.props.children}
      </PatientRecordContext.Provider>
    );
  }
}

export default PatientRecordProvider;
