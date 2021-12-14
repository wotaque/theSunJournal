var commentsList = document.getElementById("comment-list");
var commentForm = document.getElementById("comment-form");
var commentTextbox = document.getElementById("comment-textbox");
var entry;
var entryTitle = document.getElementById("entry-title")
// commentForm.addEventListener("submit", addComment(commentTextbox.value));

function getEntry(){
    var id = window.location.search.slice(1);
    entry = entries.find(e => e.id == id);
    console.log(entry);
}

getEntry();

entryTitle.innerHTML = entry.mess



// function addComment(comment) {
//     var commentHtml = `
//         <div class="comment">
//             <div class="top-comment">
//                 <p class="user">
//                     ${comment.author}
//                 </p>
//                 <p class="comment-ts">
//                     ${new Date(comment.date).toLocaleString()}
//                 </p>
//             </div>
//             <div class="comment-content">
//                 ${comment.content}
//             </div>
//         </div>
//     `
//     commentsList.insertAdjacentHTML('beforeend', commentHtml);
// }


// for (let comment of entries.comments) {
//     addComment(comment);
// };


// function getAllComments() {

//     for (let comment of comments) {
//         var html = `
//         <li class="row">
            
//             <h4 class="title">
//                 ${entry.title}
//             <h4>
            
//             <div class="bottom>
//                 <p class="message">
//                     ${entry.message}
//                 </p>
//                 <p class="comment-count">
//                     ${commentCount} comments
//                 </p>
//             </div>
//         </li>
//         `
//         list.insertAdjacentHTML('afterend', html)
//     };
// };