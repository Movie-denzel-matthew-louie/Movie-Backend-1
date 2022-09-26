

export default function About(props) {
    // language=HTML
    return `<div class="about-bg">
        <header>
            <h1 class="about-txt">About Us</h1>
        </header>
        <main id="aboutMain">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <p id="about-text" class="about-txt"><span style="color: yellowgreen">Kat's fave movie quote</span>: "So, yeah. I'm a single mother. I have two kids I love more than anything in the world. I drive a Honda, I still have dial-up internet. I got a 2.7 GPA in college, not a 3.4. And while I'm at it telling the truth, I name my kids' poop after you. And I work for Danny. I'm his assistant. That's it." <span style="color: yellow">-Katherine</span>, <span style="text-decoration: underline"><em>Just Go With It</span></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <img src="assets/Pro-Kat.jpg" class="img-dev1" alt="picture of a developer">
                        <p class="about-dev1">Katherine "Kat" Gil</p>
                    </div>
                    <div class="col-4">
                        <img src="assets/SA-2022.jpg" class="img-dev2" alt="picture of a developer">
                        <p class="about-dev2">Louie "Magic Mic" Espinosa</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 box-2">
                        <div class="btn btn-two" id="about-text">
                            <span class="about-text" id="change-about-text" style="text-align: left">click 4 Louie's fave qte</span>
                        </div>
                    </div>
<!--                    <div class="col-12">-->
<!--                        <button id="change-about-text">Change for Louie's fave movie quote</button>-->
<!--                    </div>-->
                </div>
                <div
            </div>
        </main>
        <div class="col-12">
            <a class="a-home" href="/" data-link><i style="font-size: 32px" id="home" class="fa-solid fa-house-chimney"></i></a>
        </div>
    </div>
    `;
}
function changeAboutQuote() {
    document.querySelector("#about-text").innerHTML = `<span style="color: yellowgreen">Louie's fave movie quote</span>: "Life is a storm, my young friend. You will bask in the sunlight one moment, be shattered on the rocks the next. What makes you a man is what you do when that storm comes. You must look into that storm and shout as you did in Rome, 'Do your worst, for I will do mine!' Then the fates will know you as we know you: as Albert Mondego, the man!" <span style="color: yellow">-Edmond Dantes</span>, 
    <span style="text-decoration: underline"><em>The Count of Monte Cristo</span>;`

}

export function AboutEvents() {
    document.querySelector("#change-about-text").addEventListener("click", changeAboutQuote);
    document.getElementById("home").addEventListener("click", function() {
        window.location = "http://localhost:8080/"
    })
}
