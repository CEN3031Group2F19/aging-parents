import React from 'react';
import './Notes.css';
import config from './config';
import { Form, Button, TextArea, Input, Dropdown } from 'semantic-ui-react';
const axios = require("axios");

/* Temporary data to be replaced with a webapi call */
const newNote = { value: 0, text: "New Note", noteContent: ""};
const testNotes = [ //Retrieve all notes from patient profile
    { value: 1, text: "Random Note 1", noteContent: "Here is some random text for Random Note 1"},
    { value: 2, text: "Randomer Note 2", noteContent: "Here is some more random text for Randomer Note 2"},
    { value: 3, text: "Favorite Food", noteContent: "Fried chicken\nRice and beans\nCereal with Almond Milk"},
];

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: newNote.value,
            title: '',
            text: '',
            notes: [newNote, ...testNotes],
            updateButtonText: 'Add',
            deleteBtnDisplay: { display:'none' }
        };
    }

    // Add or update a note
    updateNotes = (e, sender) => {
        const vals = this.enumerateNoteValues();

        // Add a new note - noteId will be a positive integer
        if (this.state.value < 1) {
            var noteId = 1;
            while (vals.includes(noteId.toString())) noteId++;

            var newNotesArr = this.state.notes;

            var addedNote = {value: noteId, text: this.state.title, noteContent: this.state.text};
            newNotesArr.splice(1, 0, addedNote);

            this.setState({
                value: newNote.value,
                title: '',
                text: '',
                notes: newNotesArr,
                updateButtonText: 'Add',
                deleteBtnDisplay: { display: 'none' }
            });
            this.handleSubmit(e);
        }
        // Update an existing note
        else if (this.state.value === 0 && this.state.title !== "") {            
            var newNotesArr = this.state.notes;

            for(var i = 0; i < newNotesArr.length; i++) 
                if (newNotesArr[i].value === this.state.value) {
                    newNotesArr[i].text = this.state.title;
                    newNotesArr[i].noteContent = this.state.text;
                    i = newNotesArr.length;
                }

            this.setState({
                notes: newNotesArr
            });
            this.handleSubmit(e);
        }
    };

    // Delete a note from state
    deleteNote = (e, sender) => {
        var newNotesArr = this.state.notes;
        for (var i = 1; i < newNotesArr.length; i++)
            if (newNotesArr[i].value === this.state.value) {
                var index = newNotesArr.indexOf(newNotesArr[i]);
                if (index > -1) {
                    newNotesArr.splice(index, 1);
                    this.setState({ 
                        notes: newNotesArr, 
                        value: newNote.value, 
                        title: '', 
                        text: '',
                        updateButtonText: 'Add',
                        deleteBtnDisplay: { display: 'none' }
                    });
                }
            }
    };

    enumerateNoteValues = () => {
        var values = [];
        for(var val in this.state.notes) 
            values.push(val);
        return values;
    };

    titleTbOnChange = event => this.setState({ title: event.target.value });
    textTbOnChange = event => this.setState({ text: event.target.value });
    selectedOnChange = (e, sender) => {
        if (sender.value === newNote.value) {
            this.setState({ 
                value: newNote.value, 
                title: '', 
                text: '', 
                updateButtonText: 'Add',
                deleteBtnDisplay: { display:'none' }
            });
        }
        else
            for(var i = 0; i < this.state.notes.length; i++)
                if (this.state.notes[i].value === sender.value) {
                    const note = this.state.notes[i];
                    this.setState({ 
                        value: note.value, 
                        title: note.text, 
                        text: note.noteContent,
                        updateButtonText: 'Update',
                        deleteBtnDisplay: { display:'inline-block' }});
            
                    i = this.state.notes.length; // Break loop
                }
    };

    handleSubmit = async (event) => {

        try {
          const serverUri =
            process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
  
          if (event.target.innerText === "Add") {
              // Request hangs here
              const response = await axios.post(`${serverUri}/Notes/api/Add`, {
                  noteId: 3,
                  patientId: 3,
                  username: 'brandon@mail.com',
                  title: 'testTitle',
                  content: 'testContent'
              });
          
              console.log(JSON.parse(response));
          }
        } catch (error) {
          console.log(error);
        }
      
      // Submit webrequest to add note to patient profile
      // const sendNoteResp = await axios.get(`submitNoteUrl/${parameters}`);
      
      // If sendNoteResp is OK, submit another request to get all notes
          // const getNotesResp = await axios.get(`getNotesUrl/${parameters}`);
  
          // If getNotesResp is BAD
              // append submittedNote to current note list
          // else, repopulate notesList with new notes
      // else display a message
    };

    render() {
        return (
            <Form
                size='massive'
                key='massive'>
                <Dropdown
                    fluid selection
                    id='notesDropdown'
                    placeholder='Select Note'
                    onChange={this.selectedOnChange}
                    options={this.state.notes}
                    value={this.state.value}
                />
                <Input 
                    onChange={this.titleTbOnChange}
                    placeholder='Title' 
                    value={this.state.title} 
                    maxLength={config.NoteTitleMaxLength} 
                    required 
                />
                <TextArea 
                    style={{resize: 'none'}}
                    onChange={this.textTbOnChange}
                    placeholder='Notes...' 
                    value={this.state.text} 
                    maxLength={config.NoteMaxLength}
                />
                <Button onClick={this.updateNotes}>{this.state.updateButtonText}</Button>
                <Button onClick={this.deleteNote} style={this.state.deleteBtnDisplay} >Delete</Button>
            </Form>
        );
    }
}

export default Notes;