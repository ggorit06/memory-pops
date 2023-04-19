import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

/* This container component manages all of the state 
for this application, delegating rendering logic to 
presentational components. */
class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId == id of the note that is edited
    // updatedKey == title or description field
    // updatedValue == value of title or description
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      searchText: newSearchText,
      notes: updatedNotes
    });
  };

  removeNote = (noteId) => {
    const notIdMatch = (note) => note.id !== noteId;
    const updatedNotes = this.state.notes.filter(notIdMatch);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}
const palettes = {
  Default: {
    background: "#ffffff",
    text: "#000000",
    button: "#cccccc"
  },
  Pink: {
    background: "#f9b4ab",
    text: "#000000",
    button: "#f29dc19"
  },
  Blue: {
    background: "#264e70",
    text: "#000000",
    button: "#0099cc"
  },
  Yellow: {
    background: "#fdebd3",
    text: "#000000",
    button: "#FBFFBD"
  },
  Green: {
    background: "#679186",
    text: "#000000",
    button: "#84FFDA"
  },
  Purple: {
    background: "#624F80",
    text: "#000000",
    button: "#b662ff"
  }
};

function applyPalette(palette) {
  const { background, text } = palette;
  document.body.style.background = background;
  document.body.style.color = text;
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.background = palette.button;
    button.style.color = text;
  });
}

// Create the UI to select a color palette
const select = document.createElement("select");
for (const paletteName in palettes) {
  const option = document.createElement("option");
  option.value = paletteName;
  option.text = paletteName;
  select.appendChild(option);
}

// Attach an event listener to the select element
select.addEventListener("change", () => {
  const selectedPaletteName = select.value;
  const selectedPalette = palettes[selectedPaletteName];
  applyPalette(selectedPalette);
});

// Add the select element to the page
document.body.appendChild(select);

export default App;
