const express = require('express'); 
const app = express();
const port = 3000; 

const posts = []
let post_id = 0;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send(posts)
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
    posts.push(post);
    res.send(post);
});

app.listen(port, console.log(`the sun is listening at http://localhost:${port}`));