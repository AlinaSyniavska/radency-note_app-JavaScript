import {guid} from "../js/helpers.js";
import {noteStatus} from "../js/constants.js";

const form = document.forms.noteForm;
const btnSetNote = document.getElementById('btnSetNote');
const btnSendEditNote = document.getElementById('btnEditNote');
const btnClose = document.getElementById('btnClose');

let oldCreateNoteDate;

btnSetNote?.addEventListener('click', (e) => {
    if (form.noteName.value === '' || form.noteCreateDate.value === '' || form.noteContent.value === '') {
        e.preventDefault();
        alert('Fill all fields!')
        return;
    }

    const newNote = {
        id: guid(),
        name: form.noteName.value,
        created: form.noteCreateDate.value,
        category: form.noteCategory.value,
        content: form.noteContent.value,
        dates: [],
        noteStatus: noteStatus.ACTIVE,
    }

    window.top.postMessage(newNote, '*')
})

btnSendEditNote?.addEventListener('click', (e) => {
    if (form.noteName.value === '' || form.noteCreateDate.value === '' || form.noteContent.value === '') {
        e.preventDefault();
        alert('Fill all fields!')
        return;
    }

    const editNote = {
        name: form.noteName.value,
        created: form.noteCreateDate.value,
        category: form.noteCategory.value,
        content: form.noteContent.value,
        dates: oldCreateNoteDate === form.noteCreateDate.value ? [] : [oldCreateNoteDate, form.noteCreateDate.value],
    }

    window.top.postMessage(editNote, '*');
    window.parent.document.getElementById('newNoteWin').classList.remove('visible');
})

btnClose?.addEventListener('click', () => {
    window.parent.document.getElementById('newNoteWin').classList.remove('visible');
})

window.onmessage = function (event) {
    if ('id' in event.data && 'name' in event.data && 'created' in event.data && 'category' in event.data && 'content' in event.data && 'dates' in event.data && 'noteStatus' in event.data) {
        form.noteName.value = event.data.name;
        form.noteCreateDate.value = event.data.created;
        form.noteCategory.value = event.data.category;
        form.noteContent.value = event.data.content;

        oldCreateNoteDate = event.data.created;

        btnSendEditNote.removeAttribute('disabled');
    }
};

