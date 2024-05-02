let form = document.getElementById('form');
let url = document.getElementById('url');
let error = document.getElementById ('error');

function applyErrorStyle(error, url) {
    error.style.visibility = "visible";
        url.style.borderColor ="hsl(0, 87%, 67%)";
        url.style.color = "hsl(0, 87%, 67%)";
        url.placeholder = "Shorten a link here...";
        url.classList.add("red-placeholder");
    }

form.addEventListener('submit', (e) => {
    if (url.value.trim() === '') {
        applyErrorStyle(error, url);
        e.preventDefault();
    } else {
        error.style.visibility = "hidden";
    }
})