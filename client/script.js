function renderPost(post) {
    const li = document.createElement('li');
    const text = document.createTextNode(post.text);
    li.appendChild(text);
    return li;
}

function renderPosts(posts) {
    container = document.getElementById('posts');

    posts.forEach(post => {
        container.appendChild(renderPost(post));
    });
}

function reloadPosts() {
    fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(renderPosts);
}

window.addEventListener('load', function() {
    reloadPosts();
});