let add_Note = document.querySelector('.add-btn');
let delete_btn = document.querySelector('.delete-btn');
let noteInput = document.querySelector('.note-input');
let notes = document.querySelector('.notes');
let btn_all = document.querySelector('.all');
let btn_completed = document.querySelector('.completed');
let btn_notCompleted = document.querySelector('.notCompleted');

let notesArray = JSON.parse(localStorage.getItem('notes')) || [];
let mood = 'create';
let currentIndex;

add_Note.onclick = () => addNote();

function addNote() {
    if (noteInput.value !== '') {
        if (mood === 'create') {
            notesArray.push({ text: noteInput.value, checked: false });
        } else {
            notesArray[currentIndex].text = noteInput.value;
            mood = 'create';
            add_Note.textContent = 'Add Note';
        }
        noteInput.value = '';
        saveNotes();
    } else {

        console.error('Input is empty');
    }
    displayNotes(notesArray);
}

function deleteNote(index) {
    notesArray.splice(index, 1);
    saveNotes();
    displayNotes(notesArray);
}

function updateNote(index) {
    currentIndex = index;
    mood = 'update';
    add_Note.textContent = 'Update';
    noteInput.value = notesArray[index].text;
}

function checkNote(index) {
    notesArray[index].checked = !notesArray[index].checked;
    saveNotes();
    displayNotes(notesArray);
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notesArray));
}

function displayNotes(array) {
    notes.innerHTML = '';
    if(array.length>0){
    array.forEach((ele) => {
        let index = notesArray.indexOf(ele);

        let note = document.createElement('div');
        note.classList.add('note');
        note.textContent = ele.text;

        if (ele.checked) {
            note.classList.add('checked');
        }

        notes.appendChild(note);

        let btns = document.createElement('div');
        note.appendChild(btns);

        let done = document.createElement('button');
        done.classList.add('done');
        done.innerHTML = `<i class="fas fa-check"></i>`;
        done.onclick = () => checkNote(index);
        btns.appendChild(done);

        let delet = document.createElement('button');
        delet.classList.add('delete');
        delet.innerHTML = `<i class="fas fa-trash"></i>`;
        delet.onclick = () => deleteNote(index);
        btns.appendChild(delet);

        let update = document.createElement('button');
        update.classList.add('update');
        update.innerHTML = `<i class="fas fa-pen"></i>`;
        update.onclick = () => updateNote(index);
        btns.appendChild(update);
    });}else{
        let note = document.createElement('div');
        note.classList.add('note');
        note.style.color='red';
        note.textContent = 'any note found ';
        notes.appendChild(note);
    }
}

btn_all.onclick = () => displayNotes(notesArray);
btn_completed.onclick = () => displayNotes(notesArray.filter(ele => ele.checked));
btn_notCompleted.onclick = () => displayNotes(notesArray.filter(ele => !ele.checked));

delete_btn.onclick=()=>{
    notesArray= [];
    localStorage.removeItem('notes');
    displayNotes(notesArray);

}
displayNotes(notesArray);
