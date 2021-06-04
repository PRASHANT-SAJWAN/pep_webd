let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");

let pencilOptions = pencil.querySelector(".tool-options");
let eraserOptions = eraser.querySelector(".tool-options");

let pencilSizeInput = pencil.querySelector("input");
let eraserSizeInput = eraser.querySelector("input");

let pencilColors = pencil.querySelectorAll(".pencil-colors div");


let activeTool = "pencil";

let currentPencilSize = 1;
let currentEraserSize = 1;
let currentPencilColor = "black";

for (let i = 0; i < pencilColors.length; i++) {
    pencilColors[i].addEventListener("click", function (e) {
        let selectedPencilColor = e.target.className;
        ctx.strokeStyle = selectedPencilColor;
        currentPencilColor = selectedPencilColor;
    })
}


pencilSizeInput.addEventListener("change", function () {
    let updatedPencilSize = pencilSizeInput.value;
    ctx.lineWidth = updatedPencilSize;
    currentPencilSize = updatedPencilSize;
})

eraserSizeInput.addEventListener("change", function () {
    let updatedEraserSize = eraserSizeInput.value;
    ctx.lineWidth = updatedEraserSize;
    currentEraserSize = updatedEraserSize;
})


pencil.addEventListener("click", function () {
    if (activeTool == "pencil") {
        // pencil options open ya close honge
        pencilOptions.classList.toggle("hide");
    }
    else {
        activeTool = "pencil";
        ctx.strokeStyle = currentPencilColor;
        ctx.lineWidth = currentPencilSize;
        eraserOptions.classList.add("hide");
    }
})
eraser.addEventListener("click", function () {
    if (activeTool == "eraser") {
        // eraser options open ya close honge
        eraserOptions.classList.toggle("hide");
    }
    else {
        activeTool = "eraser";
        ctx.strokeStyle = "white";
        ctx.lineWidth = currentEraserSize;
        pencilOptions.classList.add("hide");
    }
})