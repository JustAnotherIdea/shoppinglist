const button = document.getElementById("enter");
const input = document.getElementById("userinput");
const ul = document.querySelector("ul");
let liNodeList = document.querySelectorAll("li");
let liArray = Array.from(liNodeList);
let delButton = document.getElementsByClassName("del");
let delButtonArray = Array.from(delButton);

const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    count = -1;

const colors = [
    "rgb(229, 57, 53)",
    "rgb(253, 216, 53)",
    "rgb(244, 81, 30)",
    "rgb(76, 175, 80)",
    "rgb(33, 150, 243)",
    "rgb(156, 39, 176)",
];

const handleOnClick = index => {
    count++;
    anime({
        targets: ".tile",
        backgroundColor: colors[count % (colors.length - 1)],
        delay: anime.stagger(50, {
            grid: [columns, rows],
            from: index
        })
    });
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();

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

function keepFocus(event) {
    var blurEl = this;
    setTimeout(function() {
      blurEl.focus()
    }, 10)
};

function markDone(event){
    event.target.classList.toggle("done");
}

delButtonArray.forEach(del => del.addEventListener("click", removeParentLi));

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

liArray.forEach(li => li.addEventListener("click", markDone));

input.onblur = keepFocus;

window.onload = input.focus();