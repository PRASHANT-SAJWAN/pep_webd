let headerlinks = document.querySelectorAll('.header .header-links .links');

for (let i = 0; i < headerlinks.length; ++i) {
    headerlinks[i].addEventListener("click", (e) => {
        let selectedLink = document.querySelector('.header .header-links .links.selected-link');
        selectedLink.classList.remove('selected-link');
        e.target.classList.add('selected-link');
    });
}


let carouselIdx = 0;
let blogList = document.querySelector('.blog-posts .blog-list')
let allBlogBlockDiv = document.querySelectorAll('.blog-posts .blog-list .blog-block');
let totalCarousel = allBlogBlockDiv.length;

const carouselNextSlide = () => {
    if (carouselIdx + 1 < totalCarousel) {
        blogBlock
    }
}

const carouselPrevSlide = () => {
    if (carouselIdx - 1 >= 0) {
        
    }
}

let blogBlock = document.querySelector('.blog-posts .blog-list .blog-block.show');
blogBlock.addEventListener("click", (e) => {
    // console.log(e.target);
})