const entryTitle = document.getElementById("entry-title");
const entryTextbox = document.getElementById("entry-textbox");
const entryForm = document.getElementById("entry-form");
var list = document.getElementById('entryList');


getAllEntries();
var numEntries = entries.length;

function saveMessage() {
    localStorage.setItem('entries', JSON.stringify(entries));
};


function addMessage(title, message) {
    var entry = {
        id: numEntries,
        title: title,
        message: message,
        comments: []
    }
    entries.push(entry);
    saveMessage();
    numEntries++
    console.log(entries);
    

    var commentCount = (entry.comments != null) ? entry.comments.length : "0";
        var html = `
        <li class="row">
            <a href="/message.html?${entry.id}">
            <h4 class="title">
                ${entry.title}
            <h4>
            </a>
            <div class="bottom>
                <p class="message">
                    ${entry.message}
                </p>
                <p class="comment-count">
                    ${commentCount} comments
                </p>
            </div>
        </li>
        `
        list.insertAdjacentHTML('afterend', html)
};

function getAllEntries() {

    for (let entry of entries) {
        var commentCount = (entry.comments != null) ? entry.comments.length : "0";
        var html = `
        <li class="row">
            <a href="message.html?${entry.id}">
            <h4 class="title">
                ${entry.title}
            <h4>
            </a>
            <div class="bottom>
                <p class="message">
                    ${entry.message}
                </p>
                <p class="comment-count">
                    ${commentCount} comments
                </p>
            </div>
        </li>
        `
        list.insertAdjacentHTML('afterend', html)
    };
};

function onEntrySubmit(event) {
    event.preventDefault();
    console.log(entryTitle.value)
    console.log(entryTextbox.value)
    addMessage(entryTitle.value, entryTextbox.value);
    clearInputFields();
    console.log(entries);
}

function clearInputFields() {
    entryTitle.value = "";
    entryTextbox.value = "";
  }

entryForm.addEventListener("submit", onEntrySubmit);
  