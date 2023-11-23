//animation scroll down
function animationScroll(position) {
    const divs = document.getElementsByClassName("animation");
    if(position >= 70) divs[0].classList.add("animation-toggle")
    if(position >= 470) divs[1].classList.add("animation-toggle")
    if(position >= 1250) {
        divs[2].classList.add("animation-toggle")
        divs[3].classList.add("animation-toggle")
        divs[4].classList.add("animation-toggle")
        divs[5].classList.add("animation-toggle")
        divs[6].classList.add("animation-toggle")
        divs[7].classList.add("animation-toggle")
        divs[8].classList.add("animation-toggle")
    }

    //changement bar
    if(position >= 800) {
        const element = document.getElementById("nav");
        element.classList.add("change");
    } else {
        const element = document.getElementById("nav");
        element.classList.remove("change");
    }
}

document.addEventListener("scroll", () => {
    const y = window.scrollY;
    animationScroll(y);
});