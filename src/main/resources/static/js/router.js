import Home, {HomeEvents} from "./views/Home.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import SearchMovies, {SearchMoviesEvents} from "./views/SearchMovies.js";
// import EditMovie, {EditMoviesEvents} from "./views/EditMovie.js";
import moviesIndex, {movieSetup} from "./views/MovieIndex.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {
                glitchMovies: {
                    url: 'https://merciful-clear-regnosaurus.glitch.me/movies',
                    headers: {
                    'Accept': 'application/json'
                    }
                },
                TmbdMovies: {
                    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${POSTER_API}`,
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            },
            uri: '/',
            title: 'Home',
            viewEvent: HomeEvents
        },
        '/searchMovies': {
            returnView: SearchMovies,
            state: {},
            uri: '/searchMovies',
            title: 'Search Movies',
            viewEvent: SearchMoviesEvents
        },
        '/movies': {
            returnView: moviesIndex,
            state: {
                movies: '/movies'
            },
            uri: '/movies',
            title: 'All Movies',
            viewEvent: movieSetup
            },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        }
    };

    // if we see a URI with index.html then interpret that as a route for /
    if(URI.indexOf("index.html") > -1) {
        URI = "/";
    }

    return routes[URI];
}

