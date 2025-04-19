let btn = document.querySelector('button');
let inp = document.querySelector('input');
let ul = document.querySelector('ul');

btn.addEventListener("click", () => {
    let li = document.createElement('li');
    if(inp.value != ""){
        let delBtn = document.createElement('button');
        delBtn.innerText = "delete";
        delBtn.classList.add("delete");
        delBtn.addEventListener("click", function() {
            this.parentElement.remove();
        });

        li.innerText = inp.value;
        li.appendChild(delBtn);
        ul.appendChild(li);
        inp.value = "";
    }
});