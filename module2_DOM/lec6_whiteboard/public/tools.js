let pencil = document.querySelector ('#pencil');
let eraser = document.querySelector ('#eraser');
let undo = document.querySelector ('#undo');
let redo = document.querySelector ('#redo');
let sticky = document.querySelector ('#sticky');
let photo = document.querySelector ('#photo');
let download = document.querySelector ('#download');

let activeTool = 'pencil';

pencil.addEventListener ('click', ()=> {
    if(activeTool == 'pencil') {
        // color options of pencil open / close
    } else {
        activeTool = 'pencil';
        ctx.strokeStyle = 'black';
    }
});

eraser.addEventListener ('click', ()=> {
    if(activeTool == 'eraser') {
        // color options of eraser open / close
    } else {
        activeTool = 'eraser';
        ctx.strokeStyle = 'white';
    }
});