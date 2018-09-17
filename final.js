const body = document.querySelector("body");
const script = document.querySelector("script");
let textBox = document.querySelector("#textBox");
let submitBtn = document.querySelector("#submitBtn");
let ul = document.querySelector("ul");

submitBtn.addEventListener("click", () => {addLine();});
textBox.addEventListener("keypress", e => {if(e.which === 13){addLine();};});

function addLine(){
    let newLi = document.createElement("li");
    let textDiv = document.createElement("div");
    let btnDiv = document.createElement("div");
    let newBtn = document.createElement("button");

    newBtn.classList.add("btn", "btn-danger");
    newLi.classList.add("new-li");
    textDiv.classList.add("text-div");
    btnDiv.classList.add("btn-div");
    
    textDiv.textContent = textBox.value;
    btnDiv.appendChild(newBtn);

    newLi.appendChild(textDiv);
    newLi.appendChild(btnDiv);

    ul.appendChild(newLi);

    textBox.value = "";
};