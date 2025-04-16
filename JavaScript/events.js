let btn = document.querySelector('button');

btn.addEventListener("click", () => {
    btn.style.backgroundColor = "green";
})

// btn.addEventListener("mouseout", (e) => {
//     console.log("Mouse out event");
//     console.log(e);
// });

let inp = document.querySelector('input');
let h2 = document.querySelector('h2');

inp.addEventListener("input", () => {
    h2.innerText = inp.value;
});

inp.addEventListener("keydown", (event) => {
    let code = event.key.charCodeAt(0);
    if (
        !(code >= 65 && code <= 90) &&  // A-Z
        !(code >= 97 && code <= 122) && // a-z
        !(code === 32)                  // space
    ){
        event.preventDefault();
    }
});


addEventListener("scroll", (event) => {
    console.log("page was scrolled");
});

addEventListener("load", () => {
    console.log("page loaded");
});