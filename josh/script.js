let headerlinks = document.querySelectorAll('.header .header-links .links');

for (let i = 0; i < headerlinks.length; ++i) {
    headerlinks[i].addEventListener("click", (e) => {
        let selectedLink = document.querySelector('.header .header-links .links.selected-link');
        selectedLink.classList.remove('selected-link');
        e.target.classList.add('selected-link');
    });
}


let index = 0;
let blogList = document.querySelector('.blog-posts .blog-list');
let allBlogsDiv = document.querySelectorAll('.blog-posts .blog-list .blogs');
let carouselLength = allBlogsDiv.length;

let next = document.querySelector('.blog-posts .carousel .next');
let prev = document.querySelector('.blog-posts .carousel .prev');

next.addEventListener('click', () => {
    allBlogsDiv[index].classList.add('hide');
    allBlogsDiv[index + 3].classList.remove('hide');
    index++;
    prev.classList.remove('hide');

    if (index + 3 == carouselLength) {
        next.classList.add('hide');
    }
})

prev.addEventListener('click', () => {
    allBlogsDiv[index + 2].classList.add('hide');
    allBlogsDiv[index - 1].classList.remove('hide');
    index--;
    next.classList.remove('hide');
    if (index == 0) {
        prev.classList.add('hide');
    }
})

let blogBlock = document.querySelector('.blog-posts .blog-list .blogs');
blogBlock.addEventListener("click", (e) => {
    // console.log(e.target);
})