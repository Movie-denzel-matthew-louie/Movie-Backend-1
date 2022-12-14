const BASE_URI = `${BACKEND_HOST}/api/s3/download`;


export default function Home(props) {

    return `
        <body>
            <h1 class="h1_class" id="homeViewH1">Greatest movies EVER! At the tip of your hands.</h1>
            
            <div id="homeContainer">
                ${makeCards(props)}
            </div>
        </body>
    `;
}

function makeCards(props) {
    let htmlString = '';

    console.log(props.TmbdMovies.results[0].poster_path);


    for (let i = 0; i < props.TmbdMovies.results.length; i++) {

        htmlString  += `<div class="flip-card">
                                    <div class="flip-card-inner">
                                       <div class="flip-card-front">
                                         <img id="movieTemplate" src="https://image.tmdb.org/t/p/w300${props.TmbdMovies.results[i].poster_path}" alt="movie picture">
                                         <p class="movieDetails"></p>
                                       </div>   
                                       <div class="flip-card-back">
                                         <p class="movieDetails">${props.TmbdMovies.results[i].title}</p>
                                         <p class="movieRating">Rating: ${props.TmbdMovies.results[i].vote_average}</p>
                                         <p class="backOverview">${props.TmbdMovies.results[i].overview}</p>
                                         <span></span>
                                         <div class="icons">
<!--                                         <a href=""><i class="play_movie fa-solid fa-circle-play"></i></a>-->
<!--                                         <a href=""><i class="add_movie fa-solid fa-circle-plus"></i></a>-->
<!--                                         <a href=""><i class="like_movie fa-solid fa-heart"></i></a>-->
                                        </div>
                                       </div>
                                    </div>         
                                 </div>
                                 <hr>`
    }

    return htmlString;
}

export function HomeEvents() {
}