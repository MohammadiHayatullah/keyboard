const audio = document.getElementById("keySound");
//When you press a key on the keyboard, the corresponding key on the screen lights up and a sound plays.
document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const keyElement = document.getElementById(key);
  if (keyElement) {
    keyElement.classList.add("active");
    audio.currentTime = 0;
    audio.play();
  }
//When you release the key, the corresponding key on the screen goes back to normal.
});
document.addEventListener("keyup", (event) => {
  const key = event.key.toUpperCase();
  const keyElement = document.getElementById(key);
  if (keyElement) {
    keyElement.classList.remove("active");
  }
});
