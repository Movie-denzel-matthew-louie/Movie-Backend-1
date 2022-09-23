export default function Navbar(props) {

    // everyone can see home
    let html = `
        <nav>
            <div id="logoDiv" class="link"><a href="/" data-link id="logo">Groovy Movie</a></div>`;

    html = html + `<div class="link"><a href="/moviesIndex" data-link>Movie CRUD</a></div>`;

    html = html + `<div class="link"><a href="/searchMovies" data-link>Search<i id="magnifying" class="fa-solid fa-magnifying-glass"></i></a></div>`;

    html = html + `</nav><hr>`;
    return html;
}