import createView from "../createView.js";

let movies;

export default function moviesIndex(props) {
    const moviesHTML = generatePostsHTML(props.movies);
    // save this for loading edits later
    movies = props.movies;

    return `
        <header>
            <h1>Movies Page</h1>
        </header>
        <main>
              <h3>Movie list</h3>
            <div>
                ${moviesHTML}   
            </div>
            
            <h3>Add a post</h3>
            <form>
                <label for="title">Name</label><br>
                <input id="title" name="name" type="name" placeholder="Enter name">
                <br>
                <label for="description">Description</label><br>
                <textarea id="description" name="description" rows="10" cols="75" placeholder="Enter description"></textarea>
                <br>
                <button data-id="0" id="saveMovie" name="saveMovie" class="button btn-primary">Save Movie</button>
            </form>
            
        </main>
    `;
}

function generatePostsHTML(movies) {
    let movieHTML = `
        <table class="table">
        <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Genre</th>
            <th scope="col">Description</th>
            <th scope="col">Director</th>
        </tr>
        </thead>
        <tbody>
    `;
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];

        let genres = '';
        for (let j = 0; j < movie.genres.length; j++) {
            if(genres !== "") {
                genres += ", ";
            }
            genres += movie.genres[j].name;
        }

        movieHTML += `<tr>
            <td>${movie.name}</td>
            <td>${movie.description}</td>
            <td>${genres}</td>
            <td>${movie.director.userName}</td>
            <td><button data-id=${movie.id} class="button btn-primary editPost">Edit</button></td>
            <td><button data-id=${movie.id} class="button btn-danger deletePost">Delete</button></td>
            </tr>`;
    }
    movieHTML += `</tbody></table>`;
    return movieHTML;
}




export function movieSetup() {
    setupSaveHandler();
    setupEditHandlers();
    setupDeleteHandlers();
}

function setupEditHandlers() {
    // target all delete buttons
    const editButtons = document.querySelectorAll(".editMovie");
    // add click handler to all delete buttons
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function(event) {

            // get the movie id of the delete button
            const movieId = parseInt(this.getAttribute("data-id"));

            loadPostIntoForm(movieId);
        });
    }
}

function loadPostIntoForm(movieId) {
    // go find the movie in the movies' data that matches postId
    const movie = fetchPostById(movieId);
    if(!movie) {
        console.log("did not find movie for id " + movieId);
        return;
    }

    // load the movies' data into the form
    const nameField = document.querySelector("#name");
    const descriptionField = document.querySelector("#description");
    nameField.value = movie.name;
    descriptionField.value = movie.description;

    const saveButton = document.querySelector("#saveMovie");
    saveButton.setAttribute("data-id", movieId);
}

function fetchPostById(movieId) {
    for (let i = 0; i < movies.length; i++) {
        if(movies[i].id === movieId) {
            return movies[i];
        }

    }
    // didn't find it so return something falsy
    return false;
}

function setupDeleteHandlers() {
    // target all delete buttons
    const deleteButtons = document.querySelectorAll(".deletePost");
    // add click handler to all delete buttons
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function(event) {

            // get the post id of the delete button
            const movieId = this.getAttribute("data-id");

            deletePost(movieId);
        });
    }
}

function deletePost(movieId) {
    const request = {
        method: "DELETE",
    }
    const url = MOVIE_API_BASE_URL + `/${movieId}`;
    fetch(url, request)
        .then(function(response) {
            if(response.status !== 200) {
                console.log("fetch returned bad status code: " + response.status);
                console.log(response.statusText);
                return;
            }
            createView("/movies");
        })
}


function setupSaveHandler() {
    const saveButton = document.querySelector("#saveMovie");
    saveButton.addEventListener("click", function(event) {
        const movieId = parseInt(this.getAttribute("data-id"));
        savePost(movieId);
    });
}

function savePost(movieId) {
    // get the name and description for the new/updated movie
    const nameField = document.querySelector("#name");
    const descriptionField = document.querySelector("#description");

    // make the new/updated movie object
    const movie = {
        name: nameField.value,
        description: descriptionField.value
    }

    // make the request
    const request = {
        method: "POST",
        body: JSON.stringify(movie)
    }
    let url = MOVIE_API_BASE_URL;

    // if we are updating a movie, change the request and the url
    if(movieId > 0) {
        request.method = "PUT";
        url += `/${movieId}`;
    }

    fetch(url, request)
        .then(function(response) {
            if(response.status !== 200) {
                console.log("fetch returned bad status code: " + response.status);
                console.log(response.statusText);
                return;
            }
            createView("/movies");
        })
}