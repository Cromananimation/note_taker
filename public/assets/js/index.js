const note = {
  title: "",
  text: "",
  saveBtn: undefined,
  newBtn: undefined,
  noteList: []
}

const dom = {
  save: undefined,
  new: undefined,
  noteTitle: undefined,
  noteText: undefined,
  noteList: undefined
}

if (window.location.pathname === '/notes') {
  dom.noteTitle = document.querySelector('.note-title');
  dom.noteText = document.querySelector('.note-textarea');
  dom.save = document.querySelector('.save-note');
  dom.new = document.querySelector('.new-note');
  dom.noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }    
  })


const renderActiveNote = () => {
  hide(dom.save);

  if (activeNote.id) {
    dom.noteTitle.setAttribute('readonly', true);
    dom.noteText.setAttribute('readonly', true);
    dom.noteTitle.value = activeNote.title;
    dom.noteText.value = activeNote.text;
  } else {
    dom.noteTitle.removeAttribute('readonly');
    dom.noteText.removeAttribute('readonly');
    dom.noteTitle.value = '';
    dom.noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: dom.noteTitle.value,
    text: dom.noteText.value
  };
  console.log(newNote)

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!dom.noteTitle.value.trim() || !dom.noteText.value.trim()) {
    hide(dom.save);
  } else {
    show(dom.save);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  note.noteList = jsonNotes
  if (window.location.pathname === '/notes') {
    note.noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note_) => dom.noteList[0].append(note_));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  dom.save.addEventListener('click', handleNoteSave);
  dom.new.addEventListener('click', handleNewNoteView);
  dom.noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  dom.noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
