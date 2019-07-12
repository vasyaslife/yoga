function slider(slideIndex, slides, prev, next, dotsWrapper, dots, dotActiveName) {

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        } 
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove(dotActiveName));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add(dotActiveName);
    }

    function increaseSlideIndex(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', () => {
        increaseSlideIndex(-1);
    });
    
    next.addEventListener('click', () => {
        increaseSlideIndex(1);
    });

    dotsWrapper.addEventListener('click', (event) => {
        for (let i = 0; i < dots.length; i++) {
            if (event.target.classList.contains('dot') &&
            event.target == dots[i]) {
                currentSlide(++i);
            }
        }
    });
}

module.exports = slider;