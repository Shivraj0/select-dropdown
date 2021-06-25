function stickTable() {
    document.getElementById('stickOnScroll').style.top = `${window.scrollY}px`;
}

function scrollStick() {
    document.addEventListener('scroll', stickTable)
}

function registerEvents() {
    scrollStick();
}

document.addEventListener('load', registerEvents());