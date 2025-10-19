const keyboard = document.getElementById("keyboard");
const textArea = document.getElementById("text-input");
const audio = document.getElementById("keySound");

let capsLock = false;
//All the keys in a full PC keyboard layout
const layout = [
  [
    "Esc",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Del",
  ],
  [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "Backspace",
  ],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  ["Ctrl", "Alt", "Space", "Alt", "Ctrl"],
];

//building the keys
layout.forEach((row) => {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");

  row.forEach((key) => {
    const keyDiv = document.createElement("div");
    keyDiv.classList.add("key");
    keyDiv.id = key.toUpperCase();

    if (
      ["Backspace", "Enter", "Shift", "CapsLock", "Space", "Tab"].includes(key)
    ) {
      keyDiv.classList.add(key === "Space" ? "extra-wide" : "wide");
    }

    keyDiv.textContent = key;
    keyDiv.addEventListener("click", () => handleKey(key));
    rowDiv.appendChild(keyDiv);
  });

  keyboard.appendChild(rowDiv);
});

//managing key presses
function handleKey(key) {
  let cursor = textArea.selectionStart;
  let value = textArea.value;

  switch (key) {
    case "Backspace":
      if (cursor > 0) {
        textArea.value = value.slice(0, cursor - 1) + value.slice(cursor);
        textArea.selectionStart = textArea.selectionEnd = cursor - 1;
      }
      break;
    case "Tab":
      textArea.value = value.slice(0, cursor) + "\t" + value.slice(cursor);
      textArea.selectionStart = textArea.selectionEnd = cursor + 1;
      break;
    case "Enter":
      textArea.value = value.slice(0, cursor) + "\n" + value.slice(cursor);
      textArea.selectionStart = textArea.selectionEnd = cursor + 1;
      break;
    case "Space":
      textArea.value = value.slice(0, cursor) + " " + value.slice(cursor);
      textArea.selectionStart = textArea.selectionEnd = cursor + 1;
      break;
    case "CapsLock":
      capsLock = !capsLock;
      toggleCapsLockVisual();
      break;
    default:
      if (key.length === 1) {
        const char = capsLock ? key.toUpperCase() : key.toLowerCase();
        textArea.value = value.slice(0, cursor) + char + value.slice(cursor);
        textArea.selectionStart = textArea.selectionEnd = cursor + 1;
      }
  }

  playSound();
  textArea.focus();
}

// Caps Lock visual toggle
function toggleCapsLockVisual() {
  const capsKey = document.getElementById("CAPSLOCK");
  if (capsKey) {
    capsKey.classList.toggle("active");
  }
}

//Controlling physical keyboard events
document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const keyElement = document.getElementById(key);
  if (keyElement) keyElement.classList.add("active");
  if (event.key === "CapsLock") {
    capsLock = !capsLock;
    toggleCapsLockVisual();
  }
  playSound();
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toUpperCase();
  const keyElement = document.getElementById(key);
  if (keyElement) keyElement.classList.remove("active");
});

//Sound play function
function playSound() {
  audio.currentTime = 0;
  audio.play();
}
