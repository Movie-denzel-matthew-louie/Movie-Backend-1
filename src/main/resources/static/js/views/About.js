

export default function About(props) {
    // language=HTML
    return `<div class="about-bg">
        <header>
            <h1 class="about-txt">About Us</h1>
        </header>
        <main id="aboutMain">
                <div class="row">
                    <div class="col-4">
                        <img src="assets/Pro-Kat.jpg" class="img-dev1" alt="picture of a developer">
                        <p class="about">Denzel Britton</p>
                    </div>
                    <div class="col-4">
                        <img src="assets/SA-2022.jpg" class="img-dev2" alt="picture of a developer">
                        <p class="about">Louie Espinosa</p>
                    </div>
                    <div class="col-4">
                        <img src="assets/SA-2022.jpg" class="img-dev3" alt="picture of a developer">
                        <p class="about">Matthew Moreno</p>
                    </div>
                </div>
                <!--TODO: 1. Add deepfake APIs for devs; 2. add icons from favicon for Facebook, LinkedIn, and Twitter  -->
            
                </div>
                <div
            </div>
    <footer style="display: flex">
        <ul>
            <li>
                <a href="https://www.linkedin.com" target="blank "data-link>
                    <i class="fa-brands fa-linkedin icons"></i>
                </a>
            </li>

        </ul>

        <a href="/" data-link><i class="fa-brands fa-square-facebook icons"></i></a>
        <a href="/" data-link><i class="fa-brands fa-square-twitter icons"></i></a>
        <a style="margin-left: 10px" href="https://www.youtube.com/watch?v=tvFqMSCOsPU" data-link><i class="fa-solid fa-candy-cane"></i></a>
        <div>
            <a class="a-home" href="/" data-link><i id="home" class="fa-solid fa-house-chimney"></i></a>
        </div>
    </footer>
        </main>
    `;
}

export function AboutEvents() {

}
