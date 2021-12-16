const postsContainer = document.getElementById('posts');

//localhost path endpoint
function endpoint(path) {
    path = path || '';
    return 'http://localhost:3000/' + path;
};

//Fetch and post 
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
    //Creates text entries and reactions
    const li = document.createElement('li');
    li.setAttribute('id', 'post-'+post.id);
    const text = document.createTextNode(post.text);
    const reactions = document.createElement('div');
    reactions.classList.add('reactions');

    //Displays emojis
    reactions.appendChild(renderReaction('👍🏻', 0));
    reactions.appendChild(renderReaction('😢', 0));
    reactions.appendChild(renderReaction('🔥', 0));

    //Creates the replies textbox
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

    //Appends the posts and comments 
    const send_button = document.createElement('input');
    send_button.setAttribute('type', 'submit');
    comment_form.appendChild(post_id);
    comment_form.appendChild(comment_line);
    comment_form.appendChild(send_button);
    comment_form.addEventListener('submit', submitComment);
    li.appendChild(comment_form);
    return li;
};

//Calls renderPost
function appendPost(post) {
    postsContainer.appendChild(renderPost(post));
};

//Targets the comment textarea and clears
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

//Renders the comments and appends to list
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
    return v;
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

//Renders posts and replies
function renderRoot(data) {
    data.posts.forEach(appendPost);
    data.replies.forEach(appendReply);
    updateReactions(data.reactions);
};

//Fetches posts from server
function reloadPosts() {
    fetch(endpoint())
        .then(response => response.json())
        .then(renderRoot);
};

//Creates the post and appends it 
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

//When window reloads, run reloadPpost()
window.addEventListener('load', function() {
    reloadPosts();
});

//Targets the entry-textbox and creates post and clears textbox after submit

var enter = document.getElementById('entry-form');
if(enter){
    enter.addEventListener('submit', function(event) {
        event.preventDefault();
        const textarea = document.getElementById('entry-textbox');
        const text = textarea.value;
        textarea.value = '';
        createPost(text);
    });
}

