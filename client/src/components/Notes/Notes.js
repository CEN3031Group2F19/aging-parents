import React from 'react';
import './Notes.css';
import config from './config';
import { Form, Button } from "semantic-ui-react";
const axios = require("axios");

/* Temporary data to be replaced with a webapi call */
const testNotes = [ //Retrieve all notes from patient profile
    { id: 1, title: "Random Note 1", text: "Here is some random text for Random Note 1"},
    { id: 2, title: "Randomer Note 2", text: "Here is some more random text for Randomer Note 2"},
    { id: 3, title: "Favorite Food", text: "Fried chicken\nRice and beans\nCereal with Almond Milk"},
];

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        notes: [],
    };
  }

  // Append a note to this.state.notes - currently defective
  appendNote = (noteInfo) => {
    this.setState(prevState => ({
      notes: [...prevState.notes, noteInfo],
    }));
  };

  render() {
    this.state.notes = testNotes;

    return (
        <div className="App">
            <header className="App-header">
                <NotesForm 
                    onSubmit={this.appendNote}
                    noteListItems={this.state.notes}/>
            </header>
        </div>
    );
  }
}

class NotesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
        };
    }

    titleTbOnChange = event => this.setState({ title: event.target.value });
    textTbOnChange = event => this.setState({ text: event.target.value });
    selectedOnChange = event => {    
        const index = event.target.selectedIndex;
        var newText = '';
        var newTitle = '';

        if (index > 0) {
            newTitle = this.props.noteListItems[index - 1].title;
            newText = this.props.noteListItems[index - 1].text;
        }

        this.setState({ title: newTitle, text: newText });
    };

    handleSubmit = async (event) => {
      event.preventDefault();
      
      // Submit webrequest to add note to patient profile
      // const sendNoteResp = await axios.get(`submitNoteUrl/${parameters}`);
      
      // If sendNoteResp is OK, submit another request to get all notes
          // const getNotesResp = await axios.get(`getNotesUrl/${parameters}`);
  
          // If getNotesResp is BAD
              // append submittedNote to current note list
              this.props.onSubmit({title: this.state.title, text: this.state.text});
          // else, repopulate notesList with new notes
      // else display a message
    };

    render() {
        return (
            <form id="NoteForm" onSubmit={this.handleSubmit}>
                <NoteList
                    onChange={this.selectedOnChange}
                    listItems={this.props.noteListItems}
                />
                <br />
                <NoteTitle placeholder={"Title"} text={this.state.title} onChange={this.titleTbOnChange} />
                <br />
                <NoteText text={this.state.text} onChange={this.textTbOnChange} />
                <br />
                <SaveButton text={"Save"}/>
            </form>
        );
    }
}

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <select id="noteSelectList" onChange={this.props.onChange}>
                <Note title="New Note" />
                {this.props.listItems.map(note => <Note {...note} />)}
            </select>
        );
    }
}

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <option key={this.props.id}>{this.props.title}</option>
        );
    }
}

class NoteTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    render() {
        return (
            <input type="text" 
                placeholder={this.props.placeholder} 
                maxLength={config.NoteTitleMaxLength}
                onChange={this.props.onChange}
                value={this.props.text}
                required />
        );
    }
}

class NoteText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    render() {
        return(
            <textarea maxLength={config.NoteMaxLength}
                    value={this.props.text}
                    onChange={this.props.onChange}/>
        );
    }
}

class SaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <button>
                {this.props.text}
            </button>
        );
    }
}

export default Notes;