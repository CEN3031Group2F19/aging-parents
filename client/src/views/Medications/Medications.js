import React from "react";
import "./Medications.css";
import MedicationList from "./MedicationList";

import medications from "../../assets/ICONS/ICON_MEDICATIONS.png";
import HeaderPage from "../../components/Header-Page/HeaderPage";
import {
  Label,
  Form,
  Button,
  TextArea,
  Input,
  Dropdown
} from "semantic-ui-react";
const axios = require("axios");

class Medications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medications: []
    };

    this.populateMedications();
  }

  populateMedications = async () => {
    const serverUri =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

    try {
      const response = await axios.get(
        `${serverUri}/Medications/api/Medications`
      );

      var dbMedications = [];

      response.data.forEach(el => {
        dbMedications.splice(0, 0, { key: el.key, title: el.name });
      });

      this.setState({ medications: [...dbMedications] });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <HeaderPage icon={medications} title="Medications" />
        <MedicationList medications={this.state.medications} />
      </>
    );
  }
}

export default Medications;
