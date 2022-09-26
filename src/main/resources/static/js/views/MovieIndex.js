import createView from "../createView.js";

let movies;
let genres;

export default function moviesIndex(props) {
    const moviesHTML = generatePostsHTML(props.movies);
    const genreHTML = generateGenreHTML(props.genres);
    // save this for loading edits later
    movies = props.movies;
    genres = props.genres;

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
                 <label class="movie_title text-white" for="title">Title</label><br>
                <input id="title" style="width: 20%" name="title" type="text" placeholder="Enter a title"> <br>
                <div class="invalid-feedback">
                    Title cannot be blank
                </div>
                <div class="valid-feedback">
                    Your title is ok!
                </div>
            </div>
            <div>    
                <label class="text-white" id="label" for="content">Description</label> <br>
                <textarea id="content" name="content" rows="10" cols="50" placeholder="Enter description"></textarea>
                <div class="invalid-feedback">
                    Description cannot be blank
                </div>
                <div class="valid-feedback">
                    Your description is ok!
                </div>
                <br>
                <label class="text-white" for="director">Director</label><br>
                <input id="director" name="director" type="director" placeholder="Enter Director">
                <br>
                <br>
                <h6 class="text-white">Genres</h6>
                ${genreHTML}
                
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
                                <p class="movieRating">Genres: ${genres}</p>
                                <p class="backOverview">${movie.description}</p>
                            <div>
                                <a href=""><i class="play_movie fa-solid fa-circle-play"></i></a>
                                <a href=""><i class="add_movie fa-solid fa-circle-plus"></i></a>
                                <a href=""><i class="like_movie fa-solid fa-heart"></i></a>
                                <a data-id=${movie.id} class="button btn-danger deleteMovie" href=""><i style=" position: fixed" class="del_photo fas fa-times"></i></a>
                                <a data-id=${movie.id} class="button btn-primary editMovie" href=""><i style=" position: fixed"  class="edit_photo far fa-edit"></i></a>
                            </div>
                            </div>
                        </div>
                       </div>
        `;
    }
    movieHTML += `</tbody></table>`;
    return movieHTML;
}


async function fetchPoster() {
    let userInput = document.querySelector('#searchInput');

    return await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${POSTER_API}&language=en-US&query=${userInput.value}&page=1&include_adult=false`)
        .then(async function (response) {
            if (response.status !== 200) {
                console.log("cannot read tools file");
                return "";
            } else
                return await response.json();
        });
}

export function movieSetup() {
    setupSaveHandler();
    setupEditHandlers();
    setupDeleteHandlers();
    setupValidationHandlers();
    validateFields();

}
function setupValidationHandlers() {
    let input = document.querySelector("#title");
    input.addEventListener("keyup", validateFields);
    input = document.querySelector("#content");
    input.addEventListener("keyup", validateFields);

}

function validateFields() {
    let isValid = true;
    let input = document.querySelector("#title");
    if(input.value.trim().length < 1) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        isValid = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }
    input = document.querySelector("#content");

    if(input.value.trim().length < 1) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        isValid = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }

    return isValid
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
    const nameField = document.querySelector("#title");
    const descriptionField = document.querySelector("#content");
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
    const nameField = document.querySelector("#title");
    const descriptionField = document.querySelector("#content");
    const directorField = document.querySelector("#director");

    // make the new/updated movie object
    const selectedGenres = getSelectedGenres();
    const movie = {
        name: nameField.value,
        description: descriptionField.value,
        director: directorField.value,
        genres: selectedGenres
    }
        console.log(movie);
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

function generateGenreHTML(genres) {
    let genreHTML = ``;
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];

        genreHTML += `
            <div class="form-check">
                <input class="form-check-input genre-checkbox" type="checkbox" value="" data-id="${genre.id}" id="category_${genre.id}">
                <label class="form-check-label text-white" for="flexCheckDefault">
                    ${genre.name}
                </label>
            </div>`;
    }
    return genreHTML;
}

function getSelectedGenres() {
    let genres = [];
    const checkboxes = document.querySelectorAll(".genre-checkbox");

    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if(checkbox.checked) {
            const id = checkbox.getAttribute("data-id");
            const genre = {
                id
            }
            genres.push(genre);
        }
    }
    return genres;
}
