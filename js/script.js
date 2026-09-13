document.addEventListener("DOMContentLoaded", function(){



/* ==========================
   MENU MOBILE
========================== */

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if(hamburger && menu){

    hamburger.addEventListener("click", function(){

        menu.classList.toggle("active");

        const menuAperto = menu.classList.contains("active");

        hamburger.setAttribute(
            "aria-expanded",
            menuAperto ? "true" : "false"
        );

        hamburger.setAttribute(
            "aria-label",
            menuAperto ? "Chiudi il menu" : "Apri il menu"
        );

        hamburger.innerHTML = menuAperto ? "×" : "☰";

    });


    const linkMenu = document.querySelectorAll(".menu a");

    linkMenu.forEach(function(link){

        link.addEventListener("click", function(){

            menu.classList.remove("active");

            hamburger.setAttribute("aria-expanded", "false");

            hamburger.setAttribute("aria-label", "Apri il menu");

            hamburger.innerHTML = "☰";

        });

    });
    document.addEventListener("keydown", function(event){

        if(event.key === "Escape" && menu.classList.contains("active")){

            menu.classList.remove("active");

            hamburger.setAttribute("aria-expanded", "false");

            hamburger.setAttribute("aria-label", "Apri il menu");

            hamburger.innerHTML = "☰";

            hamburger.focus();

        }

    });


}






/* ==========================
   ANIMAZIONI SCROLL
========================== */


const elementiAnimati = document.querySelectorAll(
".reveal, .value-section, .projects, .section-title, .story-text, .home-about-story, .cta, .gallery img"
);



const osservatore = new IntersectionObserver(function(entries){


    entries.forEach(function(entry){


        if(entry.isIntersecting){


            entry.target.classList.add("visible");


            osservatore.unobserve(entry.target);


        }


    });


}, {


    threshold:0.15


});


elementiAnimati.forEach(function(elemento){


    osservatore.observe(elemento);


});








/* ==========================
   HERO PARALLAX
========================== */


const heroImage = document.querySelector(".hero-image");



if(heroImage){


    window.addEventListener("scroll", function(){


        let movimento = window.scrollY * 0.18;


        heroImage.style.transform =
        "translateY(" + movimento + "px)";


    });


}








/* ==========================
   ANIMAZIONE ICONE
========================== */


const icone = document.querySelectorAll(".icon");



icone.forEach(function(icona){


    icona.addEventListener("mouseenter", function(){


        icona.style.transform="scale(1.15)";


    });



    icona.addEventListener("mouseleave", function(){


        icona.style.transform="scale(1)";


    });



});









/* ==========================
   PALLINI CAROSELLO MOBILE
========================== */


const gallerie = document.querySelectorAll(".portfolio");



gallerie.forEach(function(gallery){


    const contenitoreDots =
    gallery.parentElement.querySelector(".mobile-dots");



    if(!contenitoreDots) return;



    const immagini =
    gallery.querySelectorAll("img");



    immagini.forEach(function(){


        const dot=document.createElement("span");

        contenitoreDots.appendChild(dot);


    });




    const dots =
    contenitoreDots.querySelectorAll("span");



    if(dots[0]){

        dots[0].classList.add("active");

    }






    gallery.addEventListener("scroll", function(){



        let primaImmagine =
        gallery.querySelector("img");



        if(!primaImmagine) return;



        let distanza =
        primaImmagine.offsetWidth + 20;



        let indice =
        Math.round(
            gallery.scrollLeft / distanza
        );



        if(indice >= dots.length){

            indice=dots.length-1;

        }



        dots.forEach(function(dot){

            dot.classList.remove("active");

        });



        if(dots[indice]){

            dots[indice].classList.add("active");

        }



    });



});





});


/* ================================
   COOKIE CONSENT + GOOGLE ANALYTICS
   CONSENT MODE V2
   ================================ */

const cookieBanner = document.getElementById("cookie-banner");
const cookieAccept = document.getElementById("cookie-accept");
const cookieReject = document.getElementById("cookie-reject");
const cookieSettings = document.getElementById("cookie-settings");

const GA_MEASUREMENT_ID = "G-9RL148YMGT";


/* =================================
   GOOGLE ANALYTICS
   ================================= */

function loadGoogleAnalytics() {

    if (document.getElementById("google-analytics-script")) {
        return;
    }

    window.dataLayer = window.dataLayer || [];

    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };


    /*
       CONSENT MODE V2

       Prima di qualsiasi misurazione
       impostiamo tutti i consensi su "denied".
    */

    window.gtag("consent", "default", {

        analytics_storage: "denied",

        ad_storage: "denied",

        ad_user_data: "denied",

        ad_personalization: "denied"

    });


    /*
       Inizializzazione Google Analytics
    */

    window.gtag("js", new Date());

    window.gtag("config", GA_MEASUREMENT_ID);


    /*
       Carica Google Analytics
    */

    const script = document.createElement("script");

    script.id = "google-analytics-script";

    script.async = true;

    script.src =
        "https://www.googletagmanager.com/gtag/js?id="
        + GA_MEASUREMENT_ID;

    document.head.appendChild(script);
}


/* =================================
   CONSENSO GOOGLE ANALYTICS
   ================================= */

function grantAnalyticsConsent() {

    window.dataLayer = window.dataLayer || [];

    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };


    window.gtag("consent", "update", {

        analytics_storage: "granted",

        ad_storage: "denied",

        ad_user_data: "denied",

        ad_personalization: "denied"

    });
}


/* =================================
   NASCONDE IL BANNER
   ================================= */

function hideCookieBanner() {

    if (cookieBanner) {

        cookieBanner.style.display = "none";

    }
}


/* =================================
   CONTROLLO DELLA SCELTA PRECEDENTE
   ================================= */

const cookieConsent = localStorage.getItem("cookieConsent");


if (cookieConsent === "accepted") {

    loadGoogleAnalytics();

    grantAnalyticsConsent();

    hideCookieBanner();

}


else if (cookieConsent === "rejected") {

    hideCookieBanner();

}


/* =================================
   PULSANTE ACCETTA
   ================================= */

if (cookieAccept) {

    cookieAccept.addEventListener("click", function () {

        localStorage.setItem(
            "cookieConsent",
            "accepted"
        );


        loadGoogleAnalytics();

        grantAnalyticsConsent();

        hideCookieBanner();

    });

}

/* =================================
PULSANTE RIFIUTA
================================= */

if (cookieReject) {

    cookieReject.addEventListener("click", function () {

        localStorage.setItem(
            "cookieConsent",
            "rejected"
        );


        if (window.gtag) {

            window.gtag("consent", "update", {

                analytics_storage: "denied",

                ad_storage: "denied",

                ad_user_data: "denied",

                ad_personalization: "denied"

            });

        }


        hideCookieBanner();

    });

}


/* =================================
GESTISCI COOKIE
================================= */

if (cookieSettings) {

    cookieSettings.addEventListener("click", function () {

        if (cookieBanner) {

            cookieBanner.style.display = "flex";

        }

    });

}