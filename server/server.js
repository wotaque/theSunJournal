const express = require('express'); 
const app = express();
const port = 3000; 
const fs = require('fs');
const { finished } = require('stream');

// var data = fs.readFileSync('posts.json');
// var posts = JSON.parse(data);
// console.log(posts)

// const data = require('../client/data')
// var posts = JSON.stringify(data)
app.use(express.static('../client'))

app.get('/', (req, res) => {
    res.send('Hello World, this is our propaganda blog website!')
});

// app.get('/add/:idpost/:text', addPost);

// function addPost(request, response) {
//     var data = request.params;
//     var idpost = data.idpost;
//     var text = data.text;
//     var reply;
//     if (!text) {
//         reply = {
//             msg: "A blog is required."
//         }
//     } else {
//         posts[idpost] = text;
//         var data = JSON.stringify(posts, null, 2);
//         fs.writeFile('posts.js', data, finished);

//         function finished(err) {
//             console.log('All good.');
//             reply = {
//                 idpost: idpost,
//                 text: text,
//                 status: "success"
//             }
//             response.send(reply)
//         }
        
//         }
//     }


app.listen(port, console.log(`the sun is listening at http://localhost:${port}`));