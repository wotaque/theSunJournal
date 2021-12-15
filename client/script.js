const postsContainer = document.getElementById('posts');
function endpoint(path) {
    path = path || '';
    return 'http://localhost:3000/' + path;
}

function post(url, json) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

function renderPost(post) {
    const li = document.createElement('li');
    li.setAttribute('id', 'post-'+post.id);
    const text = document.createTextNode(post.text);
    const replies = document.createElement('ol');
    li.appendChild(text);
    li.appendChild(replies);
    const comment_form = document.createElement('form');
    const comment_line = document.createElement('textarea');
    comment_line.setAttribute('name', 'text');
    const post_id = document.createElement('input');
    post_id.setAttribute('type', 'hidden');
    post_id.setAttribute('name', 'post_id');
    post_id.value = post.id;
    const send_button = document.createElement('input');
    send_button.setAttribute('type', 'submit');
    comment_form.appendChild(post_id);
    comment_form.appendChild(comment_line);
    comment_form.appendChild(send_button);
    comment_form.addEventListener('submit', submitComment);
    li.appendChild(comment_form);
    return li;
}

function appendPost(post) {
    postsContainer.appendChild(renderPost(post));
}

function submitComment(event) {
    event.preventDefault();
    const form = event.target;
    const post_id = form.querySelector('[name=post_id]').value;
    const textarea = form.querySelector('textarea');
    const text = textarea.value;
    textarea.value = '';

    post(endpoint(post_id+'/reply'), { text: text })
        .then(response => response.json())
        .then(appendReply);
}

function renderReply(reply) {
    const li = document.createElement('li');
    const text = document.createTextNode(reply.text);
    li.appendChild(text);
    return li;
}

function appendReply(reply) {
    const post_id = reply.post_id;
    container = document.getElementById('post-'+post_id).getElementsByTagName('ol')[0];

    if (container) {
        container.appendChild(renderReply(reply));
    }
}

function renderRoot(data) {
    data.posts.forEach(appendPost);
    data.replies.forEach(appendReply);
}

function reloadPosts() {
    fetch(endpoint())
        .then(response => response.json())
        .then(renderRoot);
}

function createPost(text) {
    post(endpoint(), {text: text})
        .then(response => response.json())
        .then(appendPost);
}

window.addEventListener('load', function() {
    reloadPosts();
});

document.getElementById('entry-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const textarea = document.getElementById('entry-textbox');
    const text = textarea.value;
    textarea.value = '';
    createPost(text);
});