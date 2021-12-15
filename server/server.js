const express = require('express'); 
const app = express();
const port = 3000; 

const posts = {}
let post_id = 0;
const replies = []
let reply_id = 0;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send({
        posts: Object.values(posts),
        replies: replies,
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

app.listen(port, console.log(`the sun is listening at http://localhost:${port}`));