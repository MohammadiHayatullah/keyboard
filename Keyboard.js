const audio = document.getElementById("keySound");
document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const keyElement = document.getElementById(key);
  if (keyElement) {
    keyElement.classList.add("active");
    audio.currentTime = 0;
    audio.play();
  }
});
document.addEventListener("keyup", (event) => {
  const key = event.key.toUpperCase();
  const keyElement = document.getElementById(key);
  if (keyElement) {
    keyElement.classList.remove("active");
  }
});
