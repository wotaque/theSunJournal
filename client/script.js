const postsContainer = document.getElementById('posts');
function endpoint(path) {
    path = path || '';
    return 'http://localhost:3000/' + path;
};

function post(url, json) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

function renderPost(post) {
    const li = document.createElement('li');
    li.setAttribute('id', 'post-'+post.id);
    const text = document.createTextNode(post.text);
    const reactions = document.createElement('div');
    reactions.classList.add('reactions');

    //Displays emojis
    reactions.appendChild(renderReaction('👍🏻', 0));
    reactions.appendChild(renderReaction('😢', 0));
    reactions.appendChild(renderReaction('🔥', 0));

    const replies = document.createElement('ol');
    li.appendChild(text);
    li.appendChild(reactions);
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
};

function appendPost(post) {
    postsContainer.appendChild(renderPost(post));
};

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
};

function renderReply(reply) {
    const li = document.createElement('li');
    const text = document.createTextNode(reply.text);
    li.appendChild(text);
    return li;
    
};

function appendReply(reply) {
    const post_id = reply.post_id;
    const container = document.getElementById('post-'+post_id).getElementsByTagName('ol')[0];

    if (container) {
        container.appendChild(renderReply(reply));
    };
};

// Creates the emoji button and counter
function renderReaction(emoji, value) {
    const li = document.createElement('button');
    li.appendChild(document.createTextNode(emoji));
    const v = document.createElement('span');
    v.appendChild(document.createTextNode(value));
    li.append(v);
    li.addEventListener('click', function() {
        var count = parseInt(v.innerText);
        v.innerHTML = (count += 1).toString();
    });
    
    return li;
};

function updateReactions(reactions) {
    for (post_id in reactions) {
        const container = document.getElementById('post-'+post_id).getElementsByClassName('reactions')[0];
        const emojis = reactions[post_id];

        for (emoji in emojis) {
            const e = container.querySelector('[data-emoji="'+emoji+'"]');
            if (!e) {
                container.appendChild(renderReaction(emoji, emojis[emoji]));
            } else {
                e.querySelector('span').innerText = emojis[emoji];
            };
        };
    };
};

function renderRoot(data) {
    data.posts.forEach(appendPost);
    data.replies.forEach(appendReply);
    updateReactions(data.reactions);
};

function reloadPosts() {
    fetch(endpoint())
        .then(response => response.json())
        .then(renderRoot);
};

function createPost(text) {
    post(endpoint(), {text: text})
        .then(response => response.json())
        .then(appendPost);
};

// Set character limit in textarea to 50
function charLimit(text) {
    var maxChars = 15;

    if(text.value.length > maxChars) {
        text.value = text.value.substr(0, maxChars);
    };
};

window.addEventListener('load', function() {
    reloadPosts();
});

//Targets the entry-textbox and creates post and clears textbox after submit
document.getElementById('entry-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const textarea = document.getElementById('entry-textbox');
    const text = textarea.value;
    textarea.value = '';
    createPost(text);
});
