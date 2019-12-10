import React from "react";
import "./Notes.css";
import config from "./config";
import { Confirm, Form, Button, TextArea, Input, Dropdown } from "semantic-ui-react";
import notes from "../../assets/ICONS/ICON_NOTES.png";
import HeaderPage from "../../components/Header-Page/HeaderPage";

import { throws } from "assert";
const axios = require("axios");

/* Temporary data to be replaced with a webapi call */
const newNote = { value: 0, text: "New Note", noteContent: "" };

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: newNote.value,
      title: "",
      text: "",
      notes: [],
      updateButtonText: "Add",
      deleteBtnDisplay: { display: "none" },
      open: false,
    };
    this.populateNotes();
  }

  newNoteState = e =>
    this.setState({
      value: newNote.value,
      title: "",
      text: "",
      updateButtonText: "Add",
      deleteBtnDisplay: { display: "none" }
    });

  titleTbOnChange = event => this.setState({ title: event.target.value });
  textTbOnChange = event => this.setState({ text: event.target.value });

  populateNotes = async () => {
    const serverUri =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

    try {
      const response = await axios.get(`${serverUri}/Notes/api/Notes`);

      var dbNotes = [];

      response.data.forEach(el => {
        dbNotes.splice(0, 0, {
          value: el.key,
          text: el.title,
          noteContent: el.text
        });
      });

      this.setState({ notes: [newNote, ...dbNotes] });
    } catch (error) {
      console.log(error);
    }
  };

  postRequest = async (path, body) => {
    try {
      const serverUri =
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

      await axios.post(`${serverUri}${path}`, body);

      this.populateNotes();
    } catch (error) {
      console.log(error);
    }
  };

  selectedOnChange = (e, sender) => {
    if (sender.value === newNote.value) {
      this.setState({
        value: newNote.value,
        title: "",
        text: "",
        updateButtonText: "Add",
        deleteBtnDisplay: { display: "none" }
      });
    } else
      for (var i = 0; i < this.state.notes.length; i++)
        if (this.state.notes[i].value === sender.value) {
          const note = this.state.notes[i];
          this.setState({
            value: note.value,
            title: note.text,
            text: note.noteContent,
            updateButtonText: "Update",
            deleteBtnDisplay: { display: "inline-block" }
          });

          i = this.state.notes.length; // Break loop
        }
  };

  AddUpdateBtn_Click = async () => {
    const serverUri =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

    if (this.state.updateButtonText === "Add") {
      this.postRequest("/Notes/api/Add", {
        title: this.state.title,
        text: this.state.text
      });
      this.newNoteState();
    } else if (this.state.updateButtonText === "Update") {
      this.postRequest("/Notes/api/Update", {
        key: this.state.value,
        title: this.state.title,
        text: this.state.text
      });
    }
  };

  DeleteBtn_Click = async () => {
    this.postRequest("/Notes/api/Delete", { key: this.state.value });
    this.newNoteState();
    this.setState({open: false});
  }

  render() {
    return (
      <div className="Notes">
        <HeaderPage icon={notes} title="Notes" />

        <Form size="massive" key="massive" className="NoteForm">
          <Dropdown
            fluid
            selection
            id="notesDropdown"
            placeholder="Select Note"
            onChange={this.selectedOnChange}
            options={this.state.notes}
            value={this.state.value}
          />
          <Input
            onChange={this.titleTbOnChange}
            placeholder="Title"
            value={this.state.title}
            maxLength={config.NoteTitleMaxLength}
          />
          <TextArea
            style={{ resize: "none" }}
            onChange={this.textTbOnChange}
            placeholder="Notes..."
            value={this.state.text}
            maxLength={config.NoteMaxLength}
          />
          <Button onClick={this.AddUpdateBtn_Click}>
            {this.state.updateButtonText}
          </Button>
          <Button
            onClick={() => this.setState({open: true})}
            style={this.state.deleteBtnDisplay}
          >
            Delete
          </Button>
          <Confirm 
            open={this.state.open}
            onCancel={() => this.setState({ open: false })}
            onConfirm={this.DeleteBtn_Click}
          />
        </Form>
      </div>
    );
  }
}

export default Notes;
