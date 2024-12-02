const more_h1 = document.getElementsByClassName("more-h1");
const more_p = document.getElementsByClassName("more-p");


/*more_h1.addEventListener("click", () => {
    if(more_p.className = "not-visible") {
        more_p.classList.remove("not-visible");
        more_p.classList.add("visible");
    }
});*/


/*for (let i=0; i<more_h1.length; i++){
    more_h1[i].addEventListener("click", () => {
        if(more_p[i].className = "not-visible") {
            more_p[i].classList.remove("not-visible");
            more_p[i].classList.add("visible");
        }
    });
}*/

for (let i=0; i<more_h1.length; i++){
    more_h1[i].addEventListener("click", () => {
        if(more_p[i].classList.contains ("not-visible")) {
            more_p[i].classList.remove("not-visible");
            more_p[i].classList.add("visible");
        }else {
            more_p[i].classList.remove("visible");
            more_p[i].classList.add("not-visible");
        }
    });
}
