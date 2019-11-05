import React from 'react';
import logo from '../../assets/logo.svg';
import './Notes.css';
import config from './config';

function Notes() {

    {/* Temporary function/data placeholders */}
    const noteListOnChange = () => {}; // Update Title and TextArea values
    const buttonOnClick = () => {}; // Save note to Patient profile
    const allNotes = [ //Retrieve all notes from patient profile
        <Note title={"New Note"}/>,
    ];

    return (
        <div className="App">
            <header className="App-header">
                <NotesForm 
                    noteListOnChangeFunction={noteListOnChange}
                    saveButtonOnClickFunction={buttonOnClick}
                    noteListItems={allNotes}/>
            </header>
        </div>
    );
}

function Note(props) {
    return(
        <option>{props.title}</option>
    );
}

function NotesForm(props) {
    return (
        <form className="CreateNoteForm">
            <NoteList
                onChangeFunction={props.noteListOnChangeFunction} 
                listItems={props.noteListItems}
            />
            <br />
            <NoteTitle placeholder={"Title"} />
            <br />
            <NoteText />
            <br />
            <Button onClickFunction={props.saveButtonOnClickFunction}
                    text={"Save"}/>
        </form>
    );
}

function NoteList(props) {
    return (
        <select onChange={props.onChangeFunction}>
            {props.listItems}
        </select>
    );
}

function NoteTitle(props) {
    return (
        <input type="text" 
               placeholder={props.placeholder} 
               maxLength={config.NoteTitleMaxLength}
               required />
    );
}

function NoteText() {
    return(
        <textarea maxLength={config.NoteMaxLength}/>
    );
}

function Button(props) {
    return (
        <button onClick={props.onClickFunction}>
            {props.text}
        </button>
    );
}

export default Notes;
