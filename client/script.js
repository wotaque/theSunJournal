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
    const text = document.createTextNode(post.text);
    li.appendChild(text);
    return li;
}

function appendPost(post) {
    postsContainer.appendChild(renderPost(post));
}

function renderPosts(posts) {
    posts.forEach(appendPost);
}

function reloadPosts() {
    fetch(endpoint())
        .then(response => response.json())
        .then(renderPosts);
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