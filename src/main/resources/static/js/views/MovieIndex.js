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
              <h3 id="CRUD_title">Movie list</h3>
              <div id="homeContainer">
                ${moviesHTML}   
              </div>
            
            <h3 id="add_movie">Add a Movie</h3>
            <form>
                <label for="name">Name</label><br>
                <input id="name" name="name" type="name" placeholder="Enter name">
                <br>
                <label for="description">Description</label><br>
                <textarea id="description" name="description" rows="10" cols="75" placeholder="Enter description"></textarea>
                <br>
                <label for="director">Director</label><br>
                <input id="director" name="director" type="director" placeholder="Enter Director">
                <br>
                <button data-id="0" id="saveMovie" name="saveMovie" class="button btn-primary">Save Movie</button>
            </form>
            
        </main>
    `;
}

function generatePostsHTML(movies) {
    let movieHTML = ``;
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];

        let genres = '';
        for (let j = 0; j < movie.genres.length; j++) {
            if(genres !== "") {
                genres += ", ";
            }
            genres += movie.genres[j].name;
        }

        movieHTML += ` <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img id="movieTemplate" src="https://picsum.photos/300/450" alt="movie picture">
                                <p class="movieDetails"></p>
                            </div>
                            <div class="flip-card-back">
                                <p class="movieDetails">${movie.name}</p>
                                <p class="movieRating">Director: ${movie.director}</p>
                                <p class="backOverview">${movie.description}</p>
                            <div>
                                <a href=""><i class="play_movie fa-solid fa-circle-play"></i></a>
                                <a href=""><i class="add_movie fa-solid fa-circle-plus"></i></a>
                                <a href=""><i class="like_movie fa-solid fa-heart"></i></a>
                                <a data-id=${movie.id} class="button btn-danger deleteMovie" href=""><i class="del_photo fas fa-times"></i></a>
                                <a data-id=${movie.id} class="button btn-primary editMovie" href=""><i class="edit_photo far fa-edit"></i></a>
                            </div>
                            </div>
                        </div>
                       </div>
        `;
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

            loadMovieIntoForm(movieId);
        });
    }
}

function loadMovieIntoForm(movieId) {
    // go find the movie in the movies' data that matches postId
    const movie = fetchMovieById(movieId);
    if(!movie) {
        console.log("did not find movie for id " + movieId);
        return;
    }

    // load the movies' data into the form
    const nameField = document.querySelector("#name");
    const descriptionField = document.querySelector("#description");
    const directorField = document.querySelector("#director")
    nameField.value = movie.name;
    descriptionField.value = movie.description;
    directorField.value = movie.director;

    const saveButton = document.querySelector("#saveMovie");
    saveButton.setAttribute("data-id", movieId);
}

function fetchMovieById(movieId) {
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
    const deleteButtons = document.querySelectorAll(".deleteMovie");
    // add click handler to all delete buttons
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function(event) {

            // get the movie id of the delete button
            const movieId = this.getAttribute("data-id");

            deleteMovie(movieId);
        });
    }
}

function deleteMovie(movieId) {
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
        saveMovie(movieId);
    });
}

function saveMovie(movieId) {
    // get the name and description for the new/updated movie
    const nameField = document.querySelector("#name");
    const descriptionField = document.querySelector("#description");
    const directorField = document.querySelector("#director");

    // make the new/updated movie object
    const movie = {
        name: nameField.value,
        description: descriptionField.value,
        director: directorField.value
    }

    // make the request
    const request = {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json'
        }
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

