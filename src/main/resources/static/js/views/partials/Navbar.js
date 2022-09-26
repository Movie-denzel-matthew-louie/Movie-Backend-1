export default function Navbar(props) {

    // everyone can see home
    let html = `
        <nav>
         
    <nav class="navbar navbar-expand-lg justify-content-center"  style="background-color:  #191A1D;">
        <h2><a class="" href="/" data-link>Groovy Movie</a></h2>`;

    html = html + `<h2><div class="link">  <a href="/movies" data-link>Movie CRUD</a> </div><h2>`;

    html = html + `<h2><div class="link"> <a href="/searchMovies" data-link>Search<i id="magnifying" class="fa-solid fa-magnifying-glass"></i></a> </div></h2>`;

    html = html + `<h2><div class="link">  <a href="/about" data-link>About Us</a> </div><h2>`;

    html = html + `</nav><hr>`;
    return html;
}
