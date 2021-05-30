let canvas = document.querySelector('#canvas');

let { top: canvasTop } = canvas.getBoundingClientRect();

canvas.height = window.innerHeight - canvasTop;
canvas.width = window.innerWidth;

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight - canvasTop;
    canvas.width = window.innerWidth;
})

let isMouseDown = false;
let ctx = canvas.getContext('2d');
canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    let x = e.clientX;
    let y = e.clientY;
    ctx.beginPath();
    ctx.moveTo(x, y - canvasTop);
});
canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
});
canvas.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        let x = e.clientX;
        let y = e.clientY;
        ctx.lineTo(x, y - canvasTop);
        ctx.stroke();
    }
});