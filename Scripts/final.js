
const body = document.querySelector("body");
const script = document.querySelector("script");
let textBox = document.querySelector("#textBox");
let submitBtn = document.querySelector("#submitBtn");
let ul = document.querySelector("ul");
let deletedUl = document.querySelector("#deletedList")
let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

submitBtn.onclick = () => {addLine();};
textBox.addEventListener("keypress", e => {if(e.which === 13){addLine();};});

ul.onclick = e => {if(e.target.classList.contains("btn-primary")){editLine(e);}};
ul.onclick = e => {if(e.target.classList.contains("btn-success")){completeLine(e);}};
deletedUl.onclick = e => {if(e.target.classList.contains("btn-danger")){deleteLine(e);};};

btn.onclick = () => {modal.style.display = "block";}
span.onclick = () => {modal.style.display = "none";}
window.onclick = (e) => {if (event.target == modal) {modal.style.display = "none";}}


function deleteLine(e){
    if(confirm("Are you sure you'd like to delete this line?")){
        let li = e.target.parentElement.parentElement;
        deletedUl.removeChild(li);
    };
};

function editLine(e){
    let editBtn = e.target
    let btnDiv = e.target.parentElement;
    let editText = btnDiv.previousSibling
    if(editText.hasAttribute("contenteditable")){
        editBtn.previousSibling.removeAttribute("disabled", "disabled");
        editBtn.nextSibling.removeAttribute("disabled", "disabled");
        editText.removeAttribute("contenteditable");
    } else {
        editText.setAttribute("contenteditable", true)
        editBtn.previousSibling.setAttribute("disabled", "disabled");
        editBtn.nextSibling.setAttribute("disabled", "disabled");
    }
};

function completeLine(e){
    let btnDiv = e.target.parentElement;
    let editBtn = e.target.previousSibling;
    btnDiv.previousSibling.classList.toggle("completed")
    if(editBtn.hasAttribute("disabled")){editBtn.removeAttribute("disabled");}
    else editBtn.setAttribute("disabled", "disabled");
};

function addLine(){
    let newLi = document.createElement("li");
    let textDiv = document.createElement("div");
    let btnDiv = document.createElement("div");
    let editBtn = document.createElement("button");
    let completeBtn = document.createElement("button");
//STAGE DIVS 
    //EDIT BTN
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn", "btn-primary", "btn-xs");
    //COMPLETE BTN
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("btn", "btn-success", "btn-xs");
    //TEXT DIV
    textDiv.classList.add("text-div");
    btnDiv.classList.add("btn-div");

    textDiv.textContent = textBox.value;
//APPEND TO LI
    newLi.classList.add("new-li");
    btnDiv.appendChild(deleteBtn);
    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(completeBtn);
    newLi.appendChild(textDiv);
    newLi.appendChild(btnDiv);
//APPED TO UL   
    if(textBox.value != ""){
        ul.appendChild(newLi);
        textBox.value = "";
    } else return null;
};
