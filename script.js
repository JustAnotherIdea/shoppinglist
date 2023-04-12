var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul =document.querySelector("ul");
var liNodeList = document.querySelectorAll("li");
var liArray = Array.from(liNodeList);
var delButton = document.getElementsByClassName("del");
var delButtonArray = Array.from(delButton);

function inputLength(){
    return input.value.length;
}

function createListElement(){
    var li = document.createElement("li");
    var newDelButton = document.createElement("button");
    newDelButton.innerHTML = "X";
    newDelButton.className = "del";
    newDelButton.addEventListener("click", removeParentLi);
    li.appendChild(newDelButton);
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    liArray.push(li);
    li.addEventListener("click", markDone);
    input.value = "";
}


function addListAfterClick(){
    if(inputLength() > 0){
        createListElement()
    }
}

function addListAfterKeypress(event){
    if(inputLength() > 0 && event.code === "Enter"){
        createListElement()
    }
}

function removeParentLi(event){
    event.target.parentElement.remove();
}

// cant get this to work? li is undefined? wow... thank you chatgpt... event.target now
function markDone(event){
    event.target.classList.toggle("done");
}

delButtonArray.forEach(del => del.addEventListener("click", removeParentLi));

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

liArray.forEach(li => li.addEventListener("click", markDone));