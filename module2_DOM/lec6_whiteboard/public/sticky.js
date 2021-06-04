let stickyDiv = document.querySelector("#sticky");
let canvasContent = document.querySelector('.canvas-content');
stickyDiv.addEventListener("click", appendSticky);

function appendSticky(element) {
    // <div class="sticky">
    //   <div class="sticky-header">
    //     <div class="minimize"></div>
    //     <div class="close"></div>
    //   </div>
    //   <div class="sticky-content">
    //     <textarea cols="30" rows="10"></textarea>
    //   </div>
    // </div>
    let sticky = document.createElement("div");
    sticky.classList.add("sticky");
    if (element) {
        sticky.innerHTML =
            `<div class="sticky-header">
                <div class="minimize"></div>
                <div class="close"></div>
            </div>
            <div class="sticky-content">
            </div>`;
            sticky.querySelector ('.sticky-content').append(element);
    } else {
        sticky.innerHTML =
            `<div class="sticky-header">
                <div class="minimize"></div>
                <div class="close"></div>
            </div>
            <div class="sticky-content">
                <textarea cols="30" rows="10"></textarea>
            </div>`;
    }
    let stickyHeader = sticky.querySelector(".sticky-header");
    let isStickyHold = false;
    let initialX;
    let initialY;

    stickyHeader.addEventListener("mousedown", function (e) {
        isStickyHold = true;
        initialX = e.clientX;
        initialY = e.clientY;
    })

    stickyHeader.addEventListener("mousemove", function (e) {
        if (isStickyHold) {
            // current mouse coordinate
            let finalX = e.clientX;
            let finalY = e.clientY;

            // purane coordinate se difference in distance nikala
            let dx = finalX - initialX;
            let dy = finalY - initialY;

            // set top and left of sticky
            // getBoundingClient => top left get kr skte hai but set nhi kr skte
            let { top, left } = sticky.getBoundingClientRect();

            // css m jake coordinates edit 
            sticky.style.top = top + dy + "px";
            sticky.style.left = left + dx + "px";

            // new coordinates set kre
            initialX = finalX;
            initialY = finalY;
        }
    })

    stickyHeader.addEventListener("mouseup", function () {
        isStickyHold = false;
    })

    sticky.querySelector(".minimize").addEventListener("click", function () {
        let stickyContent = sticky.querySelector(".sticky-content");
        stickyContent.classList.toggle("hide");
    })

    sticky.querySelector(".close").addEventListener("click", function () {
        sticky.remove();
    })

    canvasContent.addEventListener("mousemove", function (e) {
        if (isStickyHold) {
            // current mouse coordinate
            let finalX = e.clientX;
            let finalY = e.clientY;

            // purane coordinate se difference in distance nikala
            let dx = finalX - initialX;
            let dy = finalY - initialY;

            // set top and left of sticky
            // getBoundingClient => top left get kr skte hai but set nhi kr skte
            let { top, left } = sticky.getBoundingClientRect();

            // css m jake coordinates edit 
            sticky.style.top = top + dy + "px";
            sticky.style.left = left + dx + "px";

            // new coordinates set kre
            initialX = finalX;
            initialY = finalY;
        }
    });



    document.querySelector("body").append(sticky);
}