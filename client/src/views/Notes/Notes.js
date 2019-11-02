import React from 'react';
import logo from '../../assets/logo.svg';
import './Notes.css';

function Notes() {
    return (
        <div className="App">
            <header className="App-header">
                <form className="CreateNoteForm">
                    <input type="text" placeholder="Title" maxLength="50" required />
                    <br />
                    <textarea />
                    <br />
                    <input type="button" value="Submit" />
                </form>
            </header>
        </div>
    );
}

export default Notes;
