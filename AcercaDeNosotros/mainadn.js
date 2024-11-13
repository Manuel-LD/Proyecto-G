const more_h1 = document.getElementById("more-h1");
const more_p = document.getElementById("more-p");


more_h1.addEventListener("click", () => {
    if(more_p.className = "not-visible") {
        more_p.classList.remove("not-visible");
        more_p.classList.add("visible");
    }
});