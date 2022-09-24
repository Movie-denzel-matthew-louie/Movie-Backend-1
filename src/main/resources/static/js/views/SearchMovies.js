export default function SearchMovies(props) {
    // language=HTML
    return `
    <body>
    <header>
        
    </header>
    <main>
       
          
	            <h1 style="color:white;">Search and you will find ...</h1>
	            <form class="form_">
		            <label for="searchInput" id="searchLabel" style="color:rgb(138, 0, 252);">No pressure<svg class="no_pressure" style="color: #f3da35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M35.1,93.3,62.5,209.8a8.1,8.1,0,0,0,7.8,6.2H185.7a8.1,8.1,0,0,0,7.8-6.2L220.9,93.3a8.1,8.1,0,0,0-10-9.6L168,96,131,81.2a7.8,7.8,0,0,0-6,0L88,96,45.1,83.7A8.1,8.1,0,0,0,35.1,93.3Z" fill="#f3da35" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path><line x1="88" y1="96" x2="104" y2="216" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="168" y1="96" x2="152" y2="216" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><path d="M216,84a36,36,0,0,0-52.9-31.8,35.9,35.9,0,0,0-70.2,0A36,36,0,0,0,40,84" fill="#f3da35" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path></svg> </label>
		            <input type="text" id="searchInput" placeholder="Search for a movie!">


		            <button class="form-control" id="submit">Submit</button>
		            <br><br>
	            </form>
        
        <div id="moviesContainer">
            
    
    </main>
    </body>
    `;
}

function search() {
    let btn = document.querySelector('#submit');

    btn.addEventListener('click', renderSearch);
}

async function fetchFromOMDB() {
    let userInput = document.querySelector('#searchInput');

    return await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API}&t=${userInput.value}`)
        .then(async function (response) {
            if (response.status !== 200) {
                console.log("cannot read tools file");
                return "";
            } else
                return await response.json();
        });
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

async function renderSearch() {
    let movie_poster = await fetchPoster();
    let movie_data = await fetchFromOMDB();
    let container = document.querySelector('#moviesContainer');

    console.log(movie_data);
    console.log(movie_poster);

    container.innerHTML = `<div class="flip-card">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <img id="movieTemplate" src="https://image.tmdb.org/t/p/w300${movie_poster.results[0].poster_path}" alt="movie picture">
                                    </div>   
                                    <div class="flip-card-back">
                                        <p class="movieDetails">${movie_data.Title}</p>
                                        <p class="movieDetails">${movie_data.Rated}, ${movie_data.Genre}, ${movie_data.imdbRating}</p>
                                        <p>${movie_poster.results[0].overview}</p>
                                    </div>
                                </div>         
                           </div>`
}

export function SearchMoviesEvents() {
    search();
}