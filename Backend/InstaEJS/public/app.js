let btns = document.querySelectorAll("button");

for (let btn of btns) {
  btn.addEventListener("click", () => {
    alert("button clicked!");
  });
}
