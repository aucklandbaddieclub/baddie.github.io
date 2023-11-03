let img = document.querySelector("#destination");
let shizuoka = document.querySelector("#badminton");
let kyoto = document.querySelector("#activity");

let know = document.querySelector("#our");

shizuoka.addEventListener("click", () => {
  img.src = "assets/images/gallery1.jpg";
});

kyoto.addEventListener("click", () => {
  img.src = "assets/images/gallery2.jpg";
  //window.location.href = "./1st_page.html";
});

know.addEventListener("click", () => {
  window.location.href = "./1st_page.html";
});


