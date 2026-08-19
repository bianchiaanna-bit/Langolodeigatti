document.addEventListener("DOMContentLoaded", function(){



/* ==========================
   MENU MOBILE
========================== */


const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");


if(hamburger && menu){


    hamburger.addEventListener("click", function(){


        menu.classList.toggle("active");


        if(menu.classList.contains("active")){

            hamburger.innerHTML="×";

        } else {

            hamburger.innerHTML="☰";

        }


    });



    const linkMenu = document.querySelectorAll(".menu a");


    linkMenu.forEach(function(link){


        link.addEventListener("click", function(){


            menu.classList.remove("active");

            hamburger.innerHTML="☰";


        });


    });


}







/* ==========================
   ANIMAZIONI SCROLL
========================== */


const elementiAnimati = document.querySelectorAll(
".reveal, .value-section, .projects, .section-title, .story-text, .about-preview, .cta, .gallery img, .portfolio img"
);



const osservatore = new IntersectionObserver(function(entries){


    entries.forEach(function(entry){


        if(entry.isIntersecting){


            entry.target.classList.add("visible");


            // evita controlli inutili

            osservatore.unobserve(entry.target);


        }


    });


}, {


    threshold:0.15


});




elementiAnimati.forEach(function(elemento, indice){


    // ritardo leggero per immagini

    if(
        elemento.tagName === "IMG"
    ){

        elemento.style.transitionDelay =
        (indice * 0.08) + "s";

    }



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