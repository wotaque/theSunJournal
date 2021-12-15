let APIKEY = "VDG6I616OCKVc1Rh9vnNX69BFhZWTHfX";

document.addEventListener("DOMContentLoaded", init);
function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault();
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data);
                console.log("META", content.meta);
                let fig = document.createElement('figure');
                let img = document.createElement('img');
                let fc = document.createElement('figcaption');
                img.src = content.data[0].images.downsized.url;
                img.alt = content.data[0].title;
                fc.textContent = content.data[0].title;
                fig.appendChild(img);
                fig.appendChild(fc);
                let out = document.querySelector('.out');
                out.insertAdjacentElement('afterbegin', fig);
                document.querySelector('#search').value = '';
            })
            .catch(err => {
                console.log(err);
            });
    });
}