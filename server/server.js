const express = require('express'); 
const app = express();
const port = 3000; 

const posts = {}
let post_id = 0;
const replies = []
let reply_id = 0;
const reactions = {} // {post_id: {emoji: int}}

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send({
        posts: Object.values(posts),
        replies: replies,
        reactions: reactions,
    })
});

app.post('/', function(req, res) {
    const text = req.body.text;
    if (!text) {
        throw "Empty `text`";
    } 
    post_id++;
    const post = {
        text: text,
        id: post_id,
    }
    posts[post_id] = post;
    res.send(post);
});

app.post('/:post_id/reply', (req, res) => {
    const reply_data = req.body;
    const post_id = req.params.post_id;

    if (!post_id) {
        throw "No `post_id`";
    }

    if (!posts.hasOwnProperty(post_id)) {
        throw "No post with id " + post_id;
    }

    reply_id++;
    const reply = {
        id: reply_id,
        post_id: post_id,
        text: reply_data.text,
    };
    replies.push(reply);
    res.send(reply);
});

app.post('/:post_id/reaction/:emoji', (req, res) => {
    const reaction_data = req.body;
    const post_id = req.params.post_id;
    const emoji = req.params.emoji;

    if (!post_id) {
        throw "No `post_id`";
    }

    if (!emoji) {
        throw "No `emoji`";
    }

    if (!posts.hasOwnProperty(post_id)) {
        throw "No post with id " + post_id;
    }

    if (!reactions[post_id]) {
        reactions[post_id] = {};
    }

    if (!reactions[post_id][emoji]) {
        reactions[post_id][emoji] = 0;
    }

    reactions[post_id][emoji]++;
    res.send(reactions);
});

app.listen(port, console.log(`the sun is listening at http://localhost:${port}`));