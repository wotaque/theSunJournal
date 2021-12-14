var entries = [];

function getMessages() {
    let parsedEntries = JSON.parse(localStorage.getItem("entries"));

    if (parsedEntries) {
      entries = parsedEntries;
    }
    console.log(entries)
}
getMessages();