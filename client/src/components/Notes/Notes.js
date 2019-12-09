import React from "react";
import "./Notes.css";
import config from "./config";
import { Form, Button, TextArea, Input, Dropdown } from "semantic-ui-react";
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
      deleteBtnDisplay: { display: "none" }
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

  NotesBtn_Click = async (e, sender) => {
    const serverUri =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

    if (e.target.innerText === "Add") {
      this.postRequest("/Notes/api/Add", {
        title: this.state.title,
        text: this.state.text
      });
      this.newNoteState();
    } else if (e.target.innerText === "Update") {
      this.postRequest("/Notes/api/Update", {
        key: this.state.value,
        title: this.state.title,
        text: this.state.text
      });
    } else if (e.target.innerText === "Delete") {
      this.postRequest("/Notes/api/Delete", { key: this.state.value });
      this.newNoteState();
    }
  };

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
          <Button onClick={this.NotesBtn_Click}>
            {this.state.updateButtonText}
          </Button>
          <Button
            onClick={this.NotesBtn_Click}
            style={this.state.deleteBtnDisplay}
          >
            Delete
          </Button>
        </Form>
      </div>
    );
  }
}

export default Notes;
