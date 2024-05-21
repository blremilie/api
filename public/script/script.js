let menu = document.getElementById("menu");
let hamburger = document.getElementById("hamburger");

hamburger.addEventListener('click', function(e){
  if(menu.classList.toggle('active')) {
    menu.style.display = "block";
  }
  else {
    menu.style.display = "none";
  }
});
