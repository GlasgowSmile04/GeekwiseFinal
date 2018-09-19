let textBox = document.querySelector("#textBox");
let submitBtn = document.querySelector("#submitBtn");
let ul = document.querySelector("ul");
let deletedUl = document.querySelector("#deletedList")
let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let deleteTimer;
let popTimer;

submitBtn.onclick = () => {addLine();};
textBox.addEventListener("keypress", e => {if(e.which === 13){addLine();};});

ul.addEventListener("click", e => {if(e.target.classList.contains("btn-primary")){editLine(e);};}); 
    
// ul.onclick = e => {if(e.target.classList.contains("btn-primary")){editLine(e);}};
ul.onclick = e => {if(e.target.classList.contains("btn-success")){completeLine(e);}};
deletedUl.onclick = e => {if(e.target.classList.contains("btn-danger")){deleteLine(e);};};

btn.onclick = () => {modal.style.display = "block";}
span.onclick = () => {modal.style.display = "none";}
window.onclick = e => {if (e.target == modal) {modal.style.display = "none";}}

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
        editBtn.nextSibling.removeAttribute("disabled", "disabled");
        editText.removeAttribute("contenteditable");
    } else {
        editText.setAttribute("contenteditable", true)
        editBtn.nextSibling.setAttribute("disabled", "disabled");
    }
};

function completeLine(e){
    let btnDiv = e.target.parentElement;
    let editBtn = e.target.previousSibling;
    let stopIt = document.querySelector("#stopIt");
    btnDiv.previousSibling.classList.toggle("completed");
    if(editBtn.hasAttribute("disabled")){
        clearTimeout(deleteTimer);
        clearTimeout(popTimer);
        editBtn.removeAttribute("disabled");
    }
    else if(stopIt.checked == true){
        editBtn.setAttribute("disabled", "disabled");
        deleteTimer = setTimeout(function(){moveLi(e)}, 3000);
    }
    else {
        editBtn.setAttribute("disabled", "disabled");
        deleteTimer = setTimeout(function(){moveLi(e)}, 3000);
        popTimer = setTimeout(popModal, 3200);
    }

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
    //TEXT DIV + BTN DIV
    textDiv.classList.add("text-div");
    btnDiv.classList.add("btn-div");

    textDiv.textContent = textBox.value;
//APPEND TO LI
    newLi.classList.add("new-li");
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

function moveLi(e){
    let li = e.target.parentElement.parentElement;
    let liText = e.target.parentElement.previousSibling.textContent;
    let newLi = document.createElement("li");
    let textDiv = document.createElement("div");
    let btnDiv = document.createElement("div");
    let deleteBtn = document.createElement("button");
//STAGE DIVS
    //DELETE BTN
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "btn-xs");
    //TEXT DIV + BTN DIV
    textDiv.classList.add("text-div");
    btnDiv.classList.add("btn-div");
    textDiv.textContent = liText;
    //APPEND TO LI
    btnDiv.appendChild(deleteBtn);
    newLi.classList.add("delete-li");
    newLi.appendChild(textDiv);
    newLi.appendChild(btnDiv);

    ul.removeChild(li);
    deletedUl.appendChild(newLi);
};

function popModal(){
    modal.style.display = "block";
    setTimeout(closeModal, 3000);
}

function closeModal(){
    modal.style.display = "none";
}