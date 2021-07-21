let index = 0;
let nextBlogAt = 3;
let blogList = document.querySelector('.blog-posts .blog-list');
let allBlogsDiv = document.querySelectorAll('.blog-posts .blog-list .blogs');
let carouselLength = allBlogsDiv.length;

let next = document.querySelector('.blog-posts .carousel .next');
let prev = document.querySelector('.blog-posts .carousel .prev');

window.addEventListener("resize", (e) => {
    console.log(e.target.indexedDB.innerWidth);
})

next.addEventListener('click', () => {
    if (index + 3 < carouselLength) {
        allBlogsDiv[index].classList.add('hide');
        allBlogsDiv[index + 3].classList.remove('hide');
        index++;
    }
});

prev.addEventListener('click', () => {
    if (index > 0) {
        allBlogsDiv[index + 2].classList.add('hide');
        allBlogsDiv[index - 1].classList.remove('hide');
        index--;
    }
});

let blogBlock = document.querySelector('.blog-posts .blog-list .blogs');
blogBlock.addEventListener("click", (e) => {
    // console.log(e.target);
})